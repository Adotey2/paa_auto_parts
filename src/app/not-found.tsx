import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tight">That page doesn&apos;t exist</h1>
      <p className="mt-4 text-lg text-muted">The part may have moved. Browse everything we have in stock instead.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 font-semibold text-white hover:bg-brand"
      >
        See all parts
      </Link>
    </div>
  );
}
