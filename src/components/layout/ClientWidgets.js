"use client";

import dynamic from "next/dynamic";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const Chatbot = dynamic(() => import("@/components/chatbot/Chatbot"), { ssr: false });

/**
 * Floating widgets. The wrapper is hidden via `body.menu-open` so the buttons
 * never sit on top of the mobile navigation drawer.
 */
export default function ClientWidgets() {
  return (
    <div className="site-widgets">
      <WhatsAppButton floating />
      <Chatbot />
    </div>
  );
}
