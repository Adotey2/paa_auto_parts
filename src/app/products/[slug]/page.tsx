import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, modelsFor } from "@/lib/products";
import { site, siteUrl, formatCedis, whatsappLink } from "@/lib/site";
import { OrderButtons } from "@/components/OrderButtons";
import { JsonLd } from "@/components/JsonLd";
import { TrustList } from "@/components/TrustList";
import { ArrowLeftIcon, ShieldCheckIcon, WhatsAppIcon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const models = modelsFor(p).join(", ");
  const title = `Hyundai ${p.partNumber} ${p.commonName} – ${formatCedis(p.price)}`;
  const description = `Genuine Hyundai ${p.partNumber} ${p.name} (${p.commonName}) for ${models} with the 7-speed DCT. ${formatCedis(p.price)}, in stock in ${site.city}. Order by call or WhatsApp.`;
  const url = `/products/${p.slug}`;
  return {
    title,
    description,
    keywords: p.searchTerms,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_GH",
      images: [{ url: p.image, width: 670, height: 670, alt: p.imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [p.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const url = `${siteUrl}/products/${p.slug}`;
  const message = `Hello, I'd like to order the Hyundai ${p.partNumber} ${p.name} (${formatCedis(p.price)}). Is it available?`;
  const other = products.filter((x) => x.slug !== p.slug);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Hyundai ${p.partNumber} ${p.name}`,
    alternateName: [p.commonName, p.partNumber.replace("-", "")],
    description: p.description.join(" "),
    image: [`${siteUrl}${p.image}`],
    sku: p.partNumber,
    mpn: p.partNumber,
    brand: { "@type": "Brand", name: "Hyundai" },
    category: "Vehicle Parts & Accessories > Transmission > Clutch",
    itemCondition: "https://schema.org/NewCondition",
    isAccessoryOrSparePartFor: p.fitment.map((f) => ({
      "@type": "Car",
      name: `${f.model} ${f.years}`,
      brand: { "@type": "Brand", name: "Hyundai" },
    })),
    offers: {
      "@type": "Offer",
      url,
      price: p.price,
      priceCurrency: site.currency,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      areaServed: { "@type": "Country", name: site.country },
      seller: { "@id": `${siteUrl}/#store`, "@type": "AutoPartsStore", name: site.name },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: `Hyundai ${p.partNumber} ${p.name}`, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-0">
        <nav aria-label="Breadcrumb" className="pt-6 text-sm">
          <Link href="/#parts" className="inline-flex items-center gap-1.5 font-medium text-muted hover:text-ink">
            <ArrowLeftIcon className="size-4" />
            All parts
          </Link>
        </nav>

        <div className="mt-5 grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Photo */}
          <div className="md:sticky md:top-24 md:self-start">
            <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-line">
              <div className="m-3 rounded-2xl bg-panel">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  width={670}
                  height={670}
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-square w-full object-contain p-8 mix-blend-multiply"
                />
              </div>
              <span className="absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">
                <ShieldCheckIcon className="size-3.5 text-brand" />
                Genuine Hyundai
              </span>
            </div>
          </div>

          {/* Buy box */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand tabular-nums">
                Part no. {p.partNumber}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-stock-soft px-3 py-1 text-sm font-semibold text-stock">
                <span className="size-1.5 rounded-full bg-stock" aria-hidden="true" />
                In stock in {site.city}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
              Hyundai {p.name}
            </h1>
            <p className="mt-3 text-lg text-muted">
              {p.commonName} for the 7-speed DCT gearbox. Genuine Hyundai, brand new.
            </p>

            <p className="mt-6 text-4xl font-extrabold tabular-nums">{formatCedis(p.price)}</p>

            <div className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-line sm:p-6">
              <h2 className="font-bold">Order this part</h2>
              <p className="mt-1 mb-4 text-sm text-muted">
                WhatsApp opens with the part number already typed. Add your car&apos;s model and year so we can confirm
                the fit.
              </p>
              <OrderButtons message={message} />
              <div className="mt-6 border-t border-line pt-5">
                <TrustList compact />
              </div>
            </div>

            <section className="mt-12" aria-labelledby="about">
              <h2 id="about" className="text-2xl font-extrabold tracking-tight">
                About this part
              </h2>
              <div className="mt-3 max-w-prose space-y-4 leading-relaxed text-ink/90">
                {p.description.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
              {p.note && (
                <p className="mt-5 rounded-2xl bg-brand-soft px-5 py-4 text-sm leading-relaxed">
                  <span className="font-semibold">Good to know: </span>
                  {p.note}
                </p>
              )}
            </section>

            <section className="mt-12" aria-labelledby="fits">
              <h2 id="fits" className="text-2xl font-extrabold tracking-tight">
                Cars it fits
              </h2>
              <p className="mt-2 text-sm text-muted">
                Models with the turbo GDI engine and 7-speed dual-clutch gearbox. Not sure? Send us your VIN.
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-canvas text-muted">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Model</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Years</th>
                      <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">Body</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {p.fitment.map((f) => (
                      <tr key={f.model}>
                        <td className="px-4 py-3 font-semibold">{f.model}</td>
                        <td className="px-4 py-3 tabular-nums">{f.years}</td>
                        <td className="hidden px-4 py-3 text-muted sm:table-cell">{f.body}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="specs">
              <h2 id="specs" className="text-2xl font-extrabold tracking-tight">
                Specifications
              </h2>
              <dl className="mt-4 divide-y divide-line overflow-hidden rounded-2xl bg-white text-sm ring-1 ring-line">
                {p.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[8.5rem_1fr] gap-4 px-4 py-3">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

        {other.length > 0 && (
          <section className="mt-20" aria-labelledby="also">
            <h2 id="also" className="text-2xl font-extrabold tracking-tight">
              Often bought together
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {other.map((o) => (
                <Link
                  key={o.slug}
                  href={`/products/${o.slug}`}
                  className="group flex items-center gap-5 rounded-3xl bg-white p-4 ring-1 ring-line transition-shadow hover:shadow-md"
                >
                  <span className="shrink-0 rounded-2xl bg-panel">
                    <Image
                      src={o.image}
                      alt={o.imageAlt}
                      width={120}
                      height={120}
                      className="size-24 object-contain p-2 mix-blend-multiply"
                    />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand tabular-nums">Part no. {o.partNumber}</span>
                    <span className="block font-bold group-hover:underline">Hyundai {o.name}</span>
                    <span className="mt-1 block text-lg font-extrabold tabular-nums">{formatCedis(o.price)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky order bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-muted">{p.commonName}</p>
            <p className="text-lg font-extrabold tabular-nums">{formatCedis(p.price)}</p>
          </div>
          <a
            href={whatsappLink(site.phones[0].whatsapp, message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-semibold text-white"
          >
            <WhatsAppIcon className="size-5" />
            Order now
          </a>
        </div>
      </div>
    </>
  );
}
