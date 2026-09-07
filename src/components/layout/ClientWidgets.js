"use client";

import dynamic from "next/dynamic";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const Chatbot = dynamic(() => import("@/components/chatbot/Chatbot"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <WhatsAppButton floating />
      <Chatbot />
    </>
  );
}
