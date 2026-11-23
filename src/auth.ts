import NextAuth, { CredentialsSignin } from "next-auth";
import type { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { rateLimit, MINUTE } from "@/lib/rate-limit";
import { clientIp } from "@/lib/security";

class EmailNotVerified extends CredentialsSignin {
  code = "email_not_verified";
}

class TooManyAttempts extends CredentialsSignin {
  code = "too_many_attempts";
}

// Fournisseurs dont l'adresse e-mail est garantie vérifiée lorsque le profil l'indique (`email_verified`).
// Microsoft Entra n'en fait pas partie : la revendication `email` peut y être modifiée par l'utilisateur.
const TRUSTED_EMAIL_PROVIDERS = new Set(["google", "linkedin"]);

const ROLE_REFRESH_MS = 5 * 60 * 1000;

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, request) {
      const email = typeof credentials?.email === "string" ? credentials.email.trim() : "";
      const password = typeof credentials?.password === "string" ? credentials.password : "";
      if (!email || !password || email.length > 254 || password.length > 200) return null;

      const ip = clientIp(request.headers);
      const allowedIp = await rateLimit(`login:ip:${ip}`, 10, 15 * MINUTE);
      const allowedAccount = await rateLimit(`login:email:${email.toLowerCase()}`, 10, 15 * MINUTE);
      if (!allowedIp || !allowedAccount) throw new TooManyAttempts();

      const user = await prisma.user.findFirst({ where: { email: { equals: email, mode: "insensitive" } } });
      if (!user?.passwordHash) return null;

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return null;

      if (!user.emailVerified) throw new EmailNotVerified();

      return { id: user.id, name: user.name, email: user.email, role: user.role };
    }
  })
];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(Google);
}

if (
  process.env.AUTH_MICROSOFT_ENTRA_ID_ID &&
  process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET &&
  process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER
) {
  providers.push(MicrosoftEntraID);
}

if (process.env.AUTH_LINKEDIN_ID && process.env.AUTH_LINKEDIN_SECRET) {
  providers.push(LinkedIn);
}

export const configuredOAuthProviders = {
  google: Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
  "microsoft-entra-id": Boolean(
    process.env.AUTH_MICROSOFT_ENTRA_ID_ID &&
      process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET &&
      process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER
  ),
  linkedin: Boolean(process.env.AUTH_LINKEDIN_ID && process.env.AUTH_LINKEDIN_SECRET)
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  pages: {
    signIn: "/espace-client"
  },
  providers,
  events: {
    // Marque l'e-mail comme vérifié uniquement si le fournisseur l'atteste.
    async signIn({ user, account, profile }) {
      if (!user?.id || !account || !TRUSTED_EMAIL_PROVIDERS.has(account.provider)) return;
      if ((profile as { email_verified?: boolean } | undefined)?.email_verified !== true) return;
      await prisma.user
        .updateMany({ where: { id: user.id, emailVerified: null }, data: { emailVerified: new Date() } })
        .catch((error) => console.error("[auth] emailVerified update failed", error));
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "CLIENT";
        token.roleCheckedAt = Date.now();
      } else if (token.sub && Date.now() - Number(token.roleCheckedAt ?? 0) > ROLE_REFRESH_MS) {
        // Le rôle est relu périodiquement en base : un changement de rôle par l'admin est pris en compte sans reconnexion.
        const dbUser = await prisma.user.findUnique({ where: { id: token.sub }, select: { role: true } }).catch(() => null);
        if (!dbUser) return null;
        token.role = dbUser.role;
        token.roleCheckedAt = Date.now();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as typeof session.user & { role?: string; id?: string }).role =
          (token.role as string) ?? "CLIENT";
        (session.user as typeof session.user & { id?: string }).id = token.sub ?? "";
      }
      return session;
    }
  }
});
