import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://create.studio"),
  title: {
    default: "Create® — Design Studio",
    template: "%s — Create® Design Studio",
  },
  description: site.tagline,
  openGraph: {
    title: "Create® — Design Studio",
    description: site.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050609",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="btn btn-dark skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
