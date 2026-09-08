import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          background: "linear-gradient(150deg, #191921 0%, #0a0a0e 72%)",
        }}
      >
        <svg width="98" height="98" viewBox="0 0 100 100">
          <path
            d="M 78.3 21.7 A 40 40 0 1 0 78.3 78.3"
            fill="none"
            stroke="#e11d2e"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#ffffff" strokeWidth="12" />
        </svg>

        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#ffffff",
          }}
        >
          ORION
        </div>
      </div>
    ),
    { ...size }
  );
}
