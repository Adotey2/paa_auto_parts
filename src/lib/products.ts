// Product catalogue. To add a product, copy one entry, give it a new slug,
// drop its photo into /public/products and fill in the details.

export type Fitment = {
  model: string;
  years: string;
  body: string;
};

export type Product = {
  slug: string;
  partNumber: string;
  name: string; // Hyundai's catalogue name
  commonName: string; // what mechanics usually call it
  price: number; // Ghana cedis
  image: string;
  imageAlt: string;
  summary: string;
  description: string[];
  specs: { label: string; value: string }[];
  fitment: Fitment[];
  note?: string;
  // Extra words people type into Google for this part
  searchTerms: string[];
};

const engine = "1.6 T-GDI / turbo GDI with 7-speed dual-clutch (DCT) gearbox";

export const products: Product[] = [
  {
    slug: "hyundai-41200-2d100-double-clutch-set",
    partNumber: "41200-2D100",
    name: "Set-Double Clutch",
    commonName: "Dual clutch set",
    price: 20000,
    image: "/products/hyundai-41200-2d100-double-clutch-set.jpg",
    imageAlt:
      "Genuine Hyundai 41200-2D100 double clutch set for the 7-speed DCT gearbox",
    summary:
      "The complete double clutch pack for the 7-speed DCT on turbo Elantra, Sonata, Tucson and Veloster.",
    description: [
      "This is the genuine Hyundai double clutch set, part number 41200-2D100 (catalogue code 41200C). It is the dual clutch pack that sits between the engine and the 7-speed dual-clutch gearbox, carrying one clutch for the odd gears and one for the even gears.",
      "A worn clutch set usually shows up as juddering when pulling away, slipping under acceleration, slow or harsh gear changes, or a gearbox warning on the dashboard. Mechanics normally fit a new release bearing (41420-2D000) at the same time.",
      "It is a direct replacement built to Hyundai factory specification, brand new.",
    ],
    specs: [
      { label: "Part number", value: "41200-2D100 (412002D100)" },
      { label: "Catalogue code", value: "41200C" },
      { label: "Hyundai name", value: "Set-Double Clutch" },
      { label: "Brand", value: "Hyundai Genuine (OEM)" },
      { label: "Condition", value: "New" },
      { label: "Fitment type", value: "Direct replacement" },
      { label: "Package size", value: "36 × 37 × 10 cm (14.3 × 14.6 × 4.1 in)" },
      { label: "Weight", value: "17.1 kg (37.8 lb)" },
      { label: "Engine", value: engine },
    ],
    fitment: [
      { model: "Hyundai Elantra", years: "2016–2018", body: "Sedan, 4-door" },
      { model: "Hyundai Sonata", years: "2015–2017", body: "Sedan, 4-door" },
      { model: "Hyundai Tucson", years: "2016–2018", body: "SUV, 5-door" },
      { model: "Hyundai Veloster", years: "2015–2017", body: "Coupe, 3-door" },
    ],
    note: "Hyundai now lists 41200-2D220 as the newer number for this set. If your mechanic or parts catalogue shows 41200-2D220, call us and we'll confirm it matches your car.",
    searchTerms: [
      "41200-2D100",
      "412002D100",
      "41200-2D220",
      "Hyundai DCT clutch",
      "Hyundai dual clutch Ghana",
      "Elantra clutch set Accra",
      "Tucson DCT clutch",
      "Sonata dual clutch",
      "Veloster DCT clutch",
    ],
  },
  {
    slug: "hyundai-41420-2d000-dct-release-bearing",
    partNumber: "41420-2D000",
    name: "Bearing Set-Double Clutch",
    commonName: "DCT release bearing",
    price: 8000,
    image: "/products/hyundai-41420-2d000-dct-release-bearing.jpg",
    imageAlt:
      "Genuine Hyundai 41420-2D000 double clutch release bearing assembly",
    summary:
      "The release bearing assembly that works both clutches in the 7-speed DCT. Fits Elantra, Elantra GT, Kona, Sonata, Tucson and Veloster.",
    description: [
      "This is the genuine Hyundai release bearing assembly for the dual-clutch gearbox, part number 41420-2D000 (catalogue code 41420E). Hyundai lists it as “Bearing Set-Double Clutch”; you'll also see it called the release bearing or release bearing assembly.",
      "It presses on the double clutch set to engage and release each clutch as the gearbox changes gear. A tired bearing can cause noise from the bell housing and poor clutch engagement, and it's normally replaced whenever the clutch set is changed.",
      "It is a direct replacement built to Hyundai factory specification, brand new.",
    ],
    specs: [
      { label: "Part number", value: "41420-2D000 (414202D000)" },
      { label: "Catalogue code", value: "41420E" },
      { label: "Hyundai name", value: "Bearing Set-Double Clutch" },
      { label: "Also called", value: "Release bearing, release bearing assembly" },
      { label: "Brand", value: "Hyundai Genuine (OEM)" },
      { label: "Condition", value: "New" },
      { label: "Fitment type", value: "Direct replacement" },
      { label: "Package size", value: "23 × 23 × 19 cm (9.1 × 9.1 × 7.4 in)" },
      { label: "Weight", value: "1.0 kg (2.2 lb)" },
      { label: "Engine", value: engine },
    ],
    fitment: [
      { model: "Hyundai Elantra", years: "2016–2020", body: "Sedan, 4-door" },
      { model: "Hyundai Elantra GT", years: "2018–2020", body: "Hatchback, 5-door" },
      { model: "Hyundai Kona", years: "2018–2021", body: "SUV, 5-door" },
      { model: "Hyundai Sonata", years: "2015–2019", body: "Sedan, 4-door" },
      { model: "Hyundai Tucson", years: "2016–2018", body: "SUV, 5-door" },
      { model: "Hyundai Veloster", years: "2015–2017, 2019–2021", body: "Coupe, 3-door" },
    ],
    searchTerms: [
      "41420-2D000",
      "414202D000",
      "Hyundai DCT release bearing",
      "Hyundai dual clutch bearing Ghana",
      "Elantra release bearing Accra",
      "Kona DCT bearing",
      "Tucson clutch bearing",
      "Veloster release bearing",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function modelsFor(p: Product) {
  return p.fitment.map((f) => f.model.replace("Hyundai ", ""));
}
