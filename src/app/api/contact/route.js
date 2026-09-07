import { NextResponse } from "next/server";
import {
  checkRateLimit,
  sanitizeInput,
  validateContactForm,
  validateFile,
  MAX_FILES,
} from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    if (formData.get("website")) {
      return NextResponse.json({ message: "Enquiry sent successfully." });
    }

    const data = {
      firstName: sanitizeInput(formData.get("firstName") || ""),
      lastName: sanitizeInput(formData.get("lastName") || ""),
      company: sanitizeInput(formData.get("company") || ""),
      email: sanitizeInput(formData.get("email") || ""),
      phone: sanitizeInput(formData.get("phone") || ""),
      service: sanitizeInput(formData.get("service") || ""),
      message: sanitizeInput(formData.get("message") || ""),
    };

    const validation = validateContactForm(data);
    if (!validation.valid) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const files = formData.getAll("files").filter((f) => f && f.size > 0);

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} files allowed` },
        { status: 400 }
      );
    }

    for (const file of files) {
      const fileValidation = validateFile(file);
      if (!fileValidation.valid) {
        return NextResponse.json({ error: fileValidation.error }, { status: 400 });
      }
    }

    await sendContactEmail({ formData: data, files });

    return NextResponse.json({
      message: "Your enquiry has been sent successfully. We will respond shortly.",
    });
  } catch (error) {
    console.error("Contact form error:", error.message);
    return NextResponse.json(
      {
        error:
          error.message.includes("Email configuration")
            ? "Email service is not configured. Please contact us by phone or WhatsApp."
            : "Failed to send enquiry. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
