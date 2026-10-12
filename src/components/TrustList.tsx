import { site } from "@/lib/site";
import { ShieldCheckIcon, CarCheckIcon, ChatIcon, PinIcon } from "@/components/Icons";

export const trustPoints = [
  {
    Icon: ShieldCheckIcon,
    title: "Genuine Hyundai parts",
    body: "Brand-new original (OEM) parts with the Hyundai part number on them.",
  },
  {
    Icon: CarCheckIcon,
    title: "Fit checked before you pay",
    body: "Send your car's model, year or VIN and we'll confirm the part is right.",
  },
  {
    Icon: ChatIcon,
    title: "Talk to a real person",
    body: "Call or WhatsApp us directly. No forms, no waiting for email.",
  },
  {
    Icon: PinIcon,
    title: `Local seller in ${site.city}`,
    body: `Prices in cedis, and you deal with someone here in ${site.country}.`,
  },
];

export function TrustList({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"}>
      {trustPoints.map(({ Icon, title, body }) => (
        <li key={title} className="flex gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
            <Icon className="size-5" />
          </span>
          <span>
            <span className="block font-semibold">{title}</span>
            {!compact && <span className="mt-1 block text-sm leading-relaxed text-muted">{body}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
