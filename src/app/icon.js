import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon: the logo's red crescent wrapped around a white "O".
 * Drawn with SVG paths — Satori doesn't support per-side border colours.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060608",
        }}
      >
        <svg width="56" height="56" viewBox="0 0 100 100">
          {/* Crescent — 270° arc, gap on the right */}
          <path
            d="M 78.3 21.7 A 40 40 0 1 0 78.3 78.3"
            fill="none"
            stroke="#e11d2e"
            strokeWidth="13"
            strokeLinecap="round"
          />
          {/* Wordmark "O" */}
          <circle cx="50" cy="50" r="15" fill="none" stroke="#ffffff" strokeWidth="13" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
