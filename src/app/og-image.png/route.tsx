import { ImageResponse } from "next/og";

// Image de partage (Open Graph / Twitter) générée au build : servie sur /og-image.png.
// Le point dans le chemin l'exclut du middleware de langue.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1730 0%, #12306e 60%, #1c4fd8 100%)",
          color: "white"
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 6, opacity: 0.75 }}>VIT-GLOBAL.TECH</div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>VIT GLOBAL</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>TECHNOLOGIES GROUP</div>
        <div style={{ fontSize: 34, marginTop: 36, opacity: 0.85 }}>
          Software · SaaS · AI · Cloud · Digital transformation
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
