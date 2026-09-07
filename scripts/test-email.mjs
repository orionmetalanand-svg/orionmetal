import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    process.env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
}

loadEnvLocal();

const user = process.env.SMTP_USER;
const pass = (process.env.SMTP_PASSWORD || "").replace(/\s/g, "");
const to = process.env.CONTACT_EMAIL;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false,
  auth: { user, pass },
});

try {
  await transporter.verify();
  await transporter.sendMail({
    from: `"Orion Metal Industries" <${user}>`,
    to,
    subject: "Orion website — contact form test",
    html: "<p>SMTP is configured correctly. Contact form emails will arrive here.</p>",
  });
  console.log("SUCCESS: Test email sent to", to);
} catch (error) {
  console.error("FAILED:", error.message);
  process.exit(1);
}
