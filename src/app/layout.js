import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/layout/SiteLayout";
import { siteConfig, getPageMetadata } from "@/data/seo";
import { JsonLd, getOrganizationSchema, getWebsiteSchema } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/** Display face for headings — engineered grotesk that echoes the logo geometry. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  keywords: siteConfig.keywords,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  ...getPageMetadata("home"),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans" suppressHydrationWarning>
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
