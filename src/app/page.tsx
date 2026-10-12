import Image from "next/image";
import Link from "next/link";
import { products, modelsFor } from "@/lib/products";
import { site, siteUrl, formatCedis, whatsappLink } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { TrustList } from "@/components/TrustList";
import { WhatsAppIcon, PhoneIcon, ShieldCheckIcon, PlusIcon } from "@/components/Icons";

const allModels = [...new Set(products.flatMap(modelsFor))].sort();

const faqs = [
  [
    "Are these genuine Hyundai parts?",
    "Yes. Both are brand-new, genuine Hyundai (OEM) parts made to factory specification, with the original Hyundai part numbers.",
  ],
  [
    "Will they fit my car?",
    `They suit Hyundai models with the 1.6 turbo GDI engine and 7-speed dual-clutch (DCT) gearbox, including the ${allModels.join(", ")}. Each part page lists the exact years. If you're unsure, send us your car's model, year and VIN on WhatsApp and we'll check.`,
  ],
  [
    "Should I replace the bearing with the clutch?",
    "Most mechanics fit a new release bearing (41420-2D000) whenever they change the double clutch set (41200-2D100), because the gearbox is already apart.",
  ],
  [
    "How do I pay and collect?",
    `Call or WhatsApp us first. Once we've confirmed the part fits your car, we'll agree payment and collection with you in ${site.city}.`,
  ],
];

export default function Home() {
  const storeLd = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "@id": `${siteUrl}/#store`,
    name: site.name,
    description: site.description,
    url: siteUrl,
    image: `${siteUrl}${products[0].image}`,
    telephone: site.phones.map((p) => p.e164),
    priceRange: `${formatCedis(Math.min(...products.map((p) => p.price)))} – ${formatCedis(Math.max(...products.map((p) => p.price)))}`,
    currenciesAccepted: site.currency,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.countryCode,
    },
    areaServed: { "@type": "Country", name: site.country },
    makesOffer: products.map((p) => ({
      "@type": "Offer",
      price: p.price,
      priceCurrency: site.currency,
      url: `${siteUrl}/products/${p.slug}`,
      itemOffered: { "@type": "Product", name: `Hyundai ${p.partNumber} ${p.name}` },
    })),
  };

  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/products/${p.slug}`,
      name: `Hyundai ${p.partNumber} ${p.name}`,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <JsonLd data={storeLd} />
      <JsonLd data={listLd} />
      <JsonLd data={faqLd} />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium shadow-sm ring-1 ring-line">
            <span className="size-2 rounded-full bg-stock" aria-hidden="true" />
            In stock in {site.city}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-6xl">
            Genuine Hyundai DCT clutch parts, ready when you are
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            The dual clutch set and release bearing for the 7-speed DCT gearbox on the turbo{" "}
            {allModels.slice(0, -1).join(", ")} and {allModels.at(-1)}. Message us your part number and we&apos;ll
            confirm it fits.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(site.phones[0].whatsapp, "Hello, I'm looking for a Hyundai DCT clutch part. Can you help?")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="size-5" />
              Order on WhatsApp
            </a>
            <a
              href="#parts"
              className="rounded-full border border-line bg-white px-6 py-3.5 font-semibold transition-colors hover:border-ink"
            >
              See the parts
            </a>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            <PhoneIcon className="mr-1.5 inline size-4 align-[-3px]" />
            Prefer to talk? Call{" "}
            <a href={`tel:${site.phones[0].e164}`} className="font-semibold whitespace-nowrap text-ink underline-offset-4 hover:underline">
              {site.phones[0].local}
            </a>{" "}
            or{" "}
            <a href={`tel:${site.phones[1].e164}`} className="font-semibold whitespace-nowrap text-ink underline-offset-4 hover:underline">
              {site.phones[1].local}
            </a>
          </p>
        </div>

        {/* Product showcase */}
        <div className="hero-art grid grid-cols-2 gap-4">
          {products.map((p, i) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className={`group flex flex-col rounded-3xl bg-white p-4 shadow-[0_1px_2px_rgba(20,32,48,0.06),0_12px_32px_-12px_rgba(20,32,48,0.18)] ring-1 ring-line ${i === 1 ? "mt-10" : ""}`}
            >
              <div className="rounded-2xl bg-panel">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  width={670}
                  height={670}
                  priority
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="aspect-square w-full object-contain p-3 mix-blend-multiply"
                />
              </div>
              <span className="mt-3 text-xs font-semibold text-brand tabular-nums">{p.partNumber}</span>
              <span className="mt-0.5 text-sm font-semibold leading-snug group-hover:underline">{p.commonName}</span>
              <span className="mt-1 text-lg font-extrabold tabular-nums">{formatCedis(p.price)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust points */}
      <section aria-label="Why buy from us" className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <TrustList />
        </div>
      </section>

      {/* Products */}
      <section id="parts" aria-labelledby="parts-heading" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <h2 id="parts-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Parts in stock
        </h2>
        <p className="mt-2 text-muted">Tap a part to see the full details, specifications and every car it fits.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line"
            >
              <Link href={`/products/${p.slug}`} className="relative block bg-panel">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  width={670}
                  height={670}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-contain p-8 mix-blend-multiply"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">
                  <ShieldCheckIcon className="size-3.5 text-brand" />
                  Genuine Hyundai
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-brand tabular-nums">Part no. {p.partNumber}</p>
                    <h3 className="mt-1 text-xl font-bold">
                      <Link href={`/products/${p.slug}`} className="hover:underline">
                        Hyundai {p.name}
                      </Link>
                    </h3>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-stock-soft px-2.5 py-1 text-xs font-semibold text-stock">
                    <span className="size-1.5 rounded-full bg-stock" aria-hidden="true" />
                    In stock
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
                <ul aria-label="Fits" className="mt-4 flex flex-wrap gap-1.5">
                  {modelsFor(p).map((m) => (
                    <li key={m} className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium">
                      {m}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                  <p className="text-2xl font-extrabold tabular-nums">{formatCedis(p.price)}</p>
                  <Link
                    href={`/products/${p.slug}`}
                    className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How ordering works: a real sequence, so it's numbered */}
      <section id="how-to-order" aria-labelledby="order-heading" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="rounded-[2rem] bg-brand px-6 py-12 text-white sm:px-12">
          <h2 id="order-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ordering takes one message
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              ["Find your part number", "Check the number on your old part, ask your mechanic, or just send us your car's model and year."],
              ["Call or WhatsApp us", `Reach us on ${site.phones[0].local} or ${site.phones[1].local}. We'll confirm the part fits your car.`],
              ["Pay and collect", `Agree payment and collection with us in ${site.city}. That's it.`],
            ].map(([title, body], i) => (
              <li key={title}>
                <span className="grid size-10 place-items-center rounded-full bg-white text-lg font-extrabold text-brand">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-white/80">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={whatsappLink(site.phones[0].whatsapp, "Hello, I'm looking for a Hyundai DCT clutch part. Can you help?")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="size-5" />
              Message us on WhatsApp
            </a>
            <a
              href={`tel:${site.phones[0].e164}`}
              className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3.5 font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/20"
            >
              <PhoneIcon className="size-4" />
              Call {site.phones[0].local}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
        <h2 id="faq-heading" className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          Questions people ask
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0} className="group rounded-2xl bg-white px-5 ring-1 ring-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                {q}
                <PlusIcon className="faq-icon size-5 shrink-0 text-muted transition-transform" />
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
