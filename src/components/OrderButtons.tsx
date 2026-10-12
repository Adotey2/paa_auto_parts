import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon, PhoneIcon } from "@/components/Icons";

/** Two WhatsApp buttons and two call buttons, one per phone number. */
export function OrderButtons({ message }: { message: string }) {
  return (
    <div className="space-y-2.5">
      <div className="grid gap-2.5">
        {site.phones.map((p) => (
          <a
            key={p.e164}
            href={whatsappLink(p.whatsapp, message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="size-5" />
            Order on WhatsApp ({p.local})
          </a>
        ))}
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {site.phones.map((p) => (
          <a
            key={p.e164}
            href={`tel:${p.e164}`}
            className="flex items-center justify-center gap-2 rounded-full border border-line bg-white px-3 py-3 text-sm font-semibold whitespace-nowrap transition-colors hover:border-ink"
          >
            <PhoneIcon className="size-4" />
            Call {p.local}
          </a>
        ))}
      </div>
    </div>
  );
}
