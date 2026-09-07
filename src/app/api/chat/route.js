import { NextResponse } from "next/server";
import { checkRateLimit, sanitizeInput } from "@/lib/validation";
import { chatbotProvider } from "@/lib/chatbot-provider";

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const rateCheck = checkRateLimit(`chat-${ip}`);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const message = sanitizeInput(body.message || "");

    if (!message || message.length > 1000) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const reply = await chatbotProvider.getReply(message);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
