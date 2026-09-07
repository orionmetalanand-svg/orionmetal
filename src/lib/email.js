import nodemailer from "nodemailer";
import { company } from "@/data/company";

/**
 * Temporary: Gmail App Password works with SMTP.
 * Later you can switch SMTP_HOST / SMTP_USER / SMTP_PASSWORD to a
 * transactional provider (Resend, SendGrid, SES, etc.) without code changes.
 *
 * Required env:
 *   CONTACT_EMAIL   — where enquiries are delivered
 *   SMTP_USER       — Gmail address (or SMTP username)
 *   SMTP_PASSWORD   — Gmail App Password (16 chars), not your login password
 * Optional:
 *   SMTP_HOST       — defaults to smtp.gmail.com
 *   SMTP_PORT       — defaults to 587
 */
export async function sendContactEmail({ formData, files = [] }) {
  const contactEmail = process.env.CONTACT_EMAIL;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPassword =
    process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD;

  if (!contactEmail || !smtpUser || !smtpPassword) {
    throw new Error(
      "Email configuration incomplete. Set CONTACT_EMAIL, SMTP_USER, and SMTP_PASSWORD (Gmail App Password)."
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword.replace(/\s/g, ""),
    },
  });

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    }))
  );

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#111;">
      <h2 style="margin:0 0 16px;color:#e11d2e;">New Website Enquiry</h2>
      <p style="margin:0 0 20px;color:#555;">Submitted via ${company.name} website</p>
      <table style="border-collapse:collapse;width:100%;">
        <tr><td style="padding:10px;border:1px solid #ddd;background:#fafafa;width:140px;"><strong>Name</strong></td><td style="padding:10px;border:1px solid #ddd;">${escapeHtml(formData.firstName)} ${escapeHtml(formData.lastName)}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;background:#fafafa;"><strong>Company</strong></td><td style="padding:10px;border:1px solid #ddd;">${escapeHtml(formData.company || "—")}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;background:#fafafa;"><strong>Email</strong></td><td style="padding:10px;border:1px solid #ddd;"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;background:#fafafa;"><strong>Phone</strong></td><td style="padding:10px;border:1px solid #ddd;">${escapeHtml(formData.phone || "—")}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;background:#fafafa;"><strong>Service</strong></td><td style="padding:10px;border:1px solid #ddd;">${escapeHtml(formData.service || "—")}</td></tr>
        <tr><td style="padding:10px;border:1px solid #ddd;background:#fafafa;vertical-align:top;"><strong>Message</strong></td><td style="padding:10px;border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(formData.message)}</td></tr>
      </table>
      ${
        attachments.length
          ? `<p style="margin:20px 0 0;"><strong>Attachments:</strong> ${attachments.map((a) => escapeHtml(a.filename)).join(", ")}</p>`
          : ""
      }
    </div>
  `;

  await transporter.sendMail({
    from: `"${company.name}" <${smtpUser}>`,
    to: contactEmail,
    replyTo: formData.email,
    subject: `Website Enquiry — ${formData.firstName} ${formData.lastName}${formData.company ? ` (${formData.company})` : ""}`,
    html,
    attachments,
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
