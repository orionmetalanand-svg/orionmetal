import nodemailer from "nodemailer";
import { company } from "@/data/company";

export async function sendContactEmail({ formData, files = [] }) {
  const contactEmail = process.env.CONTACT_EMAIL;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!contactEmail || !smtpHost || !smtpUser || !smtpPassword) {
    throw new Error(
      "Email configuration incomplete. Please configure SMTP environment variables."
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
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
    <h2>New Enquiry — ${company.name}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd;">${formData.firstName} ${formData.lastName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Company</strong></td><td style="padding:8px;border:1px solid #ddd;">${formData.company || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;">${formData.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd;">${formData.phone || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Service</strong></td><td style="padding:8px;border:1px solid #ddd;">${formData.service || "—"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd;">${formData.message}</td></tr>
    </table>
    ${attachments.length ? `<p><strong>Attachments:</strong> ${attachments.map((a) => a.filename).join(", ")}</p>` : ""}
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
