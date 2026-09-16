"use client";

import Script from "next/script";

/** GA4 measurement ID (public; safe in page source). Override via env on Vercel. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-EWMPY72JQB";

/** Skip localhost/dev noise; runs on production builds only. */
export const isGoogleAnalyticsEnabled =
  process.env.NODE_ENV === "production" && Boolean(GA_MEASUREMENT_ID);

export default function GoogleAnalyticsScripts() {
  if (!isGoogleAnalyticsEnabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
