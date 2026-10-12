import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { site, siteUrl, whatsappLink } from "@/lib/site";
import { products } from "@/lib/products";
import { LogoMark, WhatsAppIcon, PhoneIcon } from "@/components/Icons";
import "./globals.css";

const jakarta = localFont({
  src: "../fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Hyundai DCT Dual Clutch Set & Release Bearing in Accra | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    ...new Set(products.flatMap((p) => p.searchTerms)),
    "Hyundai parts Ghana",
    "Hyundai parts Accra",
    "DCT clutch Ghana",
    "dual clutch transmission parts",
    "genuine Hyundai parts",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GH",
    url: "/",
    title: `Hyundai DCT dual clutch parts in Accra | ${site.name}`,
    description: site.description,
    images: [{ url: products[0].image, width: 670, height: 670, alt: products[0].imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Hyundai DCT dual clutch parts in Accra | ${site.name}`,
    description: site.description,
    images: [products[0].image],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
  // Paste the code from Google Search Console here to verify the site:
  // verification: { google: "your-code" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const nav = [
  { href: "/#parts", label: "Parts" },
  { href: "/#how-to-order", label: "How to order" },
  { href: "/#faq", label: "Questions" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight">
              <LogoMark className="size-8" />
              {site.name}
            </Link>
            <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </nav>
            <a
              href={whatsappLink(site.phones[0].whatsapp, "Hello, I'm interested in a Hyundai DCT clutch part.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="size-4" />
              <span>Chat with us</span>
            </a>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight">
                <LogoMark className="size-8" />
                {site.name}
              </Link>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Genuine Hyundai dual-clutch (DCT) parts for Elantra, Kona, Sonata, Tucson and Veloster. Sold in{" "}
                {site.city}, {site.country}.
              </p>
            </div>
            <div>
              <p className="font-semibold">Parts</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} className="hover:text-ink">
                      {p.commonName} ({p.partNumber})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold">Contact</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {site.phones.map((p) => (
                  <li key={p.e164}>
                    <a href={`tel:${p.e164}`} className="flex items-center gap-2 hover:text-ink">
                      <PhoneIcon className="size-3.5" />
                      {p.e164.replace(/^\+233(\d{2})(\d{3})(\d{4})$/, "+233 $1 $2 $3")}
                    </a>
                  </li>
                ))}
                <li>Calls and WhatsApp</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-line">
            <p className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-muted sm:px-6">
              © {site.name}. Hyundai is a trademark of Hyundai Motor Company.{" "}
              {site.name} is an independent seller of genuine Hyundai parts and is not affiliated with Hyundai.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
