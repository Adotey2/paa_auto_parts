# DCT Parts GH

A small online catalogue for genuine Hyundai 7-speed DCT clutch parts, sold in Accra. Customers browse the parts and order by phone call or WhatsApp.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and TypeScript, using the Plus Jakarta Sans font (bundled, no Google Fonts call). Every page is pre-rendered as static HTML, so it's fast and easy for Google to read.

## What you need installed

Only two programs. You don't install Next.js, React or Tailwind yourself; `npm install` gets them from `package.json`.

1. **Node.js 20.9 or newer** (22 LTS recommended) from https://nodejs.org. This also installs `npm`. Check with `node -v`.
2. **Git** from https://git-scm.com (needed to push to GitHub).

You'll also need free accounts on GitHub and Vercel. VS Code is a good editor but optional.

## Run it on your computer

```bash
cd dct-parts-gh
npm install      # downloads Next.js 16, React 19, Tailwind 4 into node_modules (first time only)
npm run dev      # starts the site at http://localhost:3000
```

Edit any file and the page refreshes by itself. Run `npm run build` to check for errors before deploying.

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. Go to https://vercel.com/new, import the repository and click **Deploy**. No settings need changing.
3. (Optional) Add your own domain under **Project → Settings → Domains**, then add an environment variable `NEXT_PUBLIC_SITE_URL` set to that domain (for example `https://dctparts.com.gh`) and redeploy. Without it the site uses your `*.vercel.app` address automatically.

## Editing the store

| What | Where |
| --- | --- |
| Store name, phone numbers, city | `src/lib/site.ts` |
| Products, prices, descriptions, fitment | `src/lib/products.ts` |
| Product photos | `public/products/` |

To add a product: put its photo in `public/products/`, copy one of the entries in `src/lib/products.ts`, give it a new `slug`, and fill in the details. The home page, product page, sitemap and Google data all update automatically.

## SEO already in place

- Page titles and descriptions built around the part numbers (41200-2D100, 41420-2D000, 412002D100, 414202D000, 41200-2D220) plus car models and "Accra / Ghana"
- Product structured data (price in GHS, in stock, brand, part number, compatible cars) so Google can show price and availability
- Store structured data (AutoPartsStore in Accra with both phone numbers)
- `sitemap.xml` with product images, `robots.txt`, canonical URLs
- Open Graph and Twitter previews, so links shared on WhatsApp and social media show the photo, name and price

## Getting found on Google

1. After deploying, open https://search.google.com/search-console, add your site, and verify it (paste the code into `verification` in `src/app/layout.tsx`, or use the DNS option).
2. In Search Console, submit `https://your-domain/sitemap.xml`.
3. Create a free Google Business Profile for the shop with the same name and phone numbers, and link to the site. This helps a lot for "near me" and "Accra" searches.
4. Share the product links in WhatsApp groups, mechanic contacts, Jiji/Tonaton listings and Facebook. Links from other sites help Google trust it.

New sites usually take a few days to a few weeks to appear in search results.

## Push to GitHub (first time)

```bash
cd dct-parts-gh
git init
git add .
git commit -m "First version"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/dct-parts-gh.git   # create this empty repo on github.com first
git push -u origin main
```

After that, every `git push` makes Vercel redeploy the site automatically.
