import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { company } from "@/data/company";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${company.name} — Precision Sheet Metal Fabrication, Moorabbin Melbourne`;

const capabilities = [
  "Laser Cutting",
  "Bending",
  "Fabrication",
  "Powder Coating",
  "Assembly",
];

export default function OpengraphImage() {
  const logo = readFileSync(
    join(process.cwd(), "public/images/company/orion-logo-light.png")
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(140deg, #14141c 0%, #08080b 48%, #050507 100%)",
        }}
      >
        {/* Red accent wash */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(225,29,46,0.30) 0%, rgba(225,29,46,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #e11d2e 0%, #ff3446 45%, rgba(225,29,46,0) 100%)",
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={430} height={205} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: "#ffffff",
            }}
          >
            Precision Sheet Metal
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            <span style={{ color: "#ffffff" }}>Fabrication. Built for</span>
            <span style={{ color: "#ff3446" }}>Industry.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {capabilities.map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "11px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.045)",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.82)",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 23,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <span>{company.address.full}</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
            <span style={{ color: "#ffffff", fontWeight: 700 }}>{company.phoneDisplay}</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
