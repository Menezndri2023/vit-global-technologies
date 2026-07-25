import { cookies } from "next/headers";

export const ADMIN_COOKIE = "vit_admin_session";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  return Boolean(value) && value === process.env.ADMIN_PASSWORD;
}
