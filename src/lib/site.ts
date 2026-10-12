// Everything about the business lives here. Change the name, phone numbers
// or location in this one file and the whole site (and its SEO) updates.

export const site = {
  name: "DCT Parts GH",
  tagline: "Genuine Hyundai dual-clutch parts in Accra",
  description:
    "Genuine Hyundai 7-speed DCT dual clutch set (41200-2D100) and release bearing (41420-2D000) for Elantra, Tucson, Kona, Sonata and Veloster. In stock in Accra, Ghana. Order by call or WhatsApp.",
  city: "Accra",
  region: "Greater Accra",
  country: "Ghana",
  countryCode: "GH",
  currency: "GHS",
  phones: [
    { e164: "+233244770988", local: "024 477 0988", whatsapp: "233244770988" },
    { e164: "+233577500992", local: "057 750 0992", whatsapp: "233577500992" },
  ],
};

// The live address of the site. On Vercel this is filled in automatically
// from your production domain. Set NEXT_PUBLIC_SITE_URL once you add a
// custom domain (e.g. https://dctparts.com.gh).
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export function whatsappLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function formatCedis(amount: number) {
  return `GH₵ ${amount.toLocaleString("en-GH")}`;
}
