import { supabase } from "./supabase";

export type Product = {
  id: string;
  handle: string;
  title: string;
  price_ngn: number;
  details: string | null;
  images: string[];
  sizes: Record<string, number>;
  collection: string;
};

export const PER_PAGE = 24;

export const naira = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

/**
 * Headline 8 Drop Pieces for UNDERATED Storefront
 */
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "underated-timeless-blue",
    handle: "underated-timeless-blue",
    title: "Timeless Tee (Blue)",
    price_ngn: 48000,
    details:
      "Mineral wash indigo blue heavyweight 240 GSM cotton tee featuring signature airbrushed woman profile stipple graphic on chest and lower UNDERATED branding. Boxy streetwear drape.",
    images: ["/products/timeless-blue.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "underated-armed",
    handle: "underated-armed",
    title: "Armed Camo Tee",
    price_ngn: 45000,
    details:
      "Heavyweight 240 GSM combed cotton tee in jet black featuring military woodland camouflage UNDERATED lettering across chest. Relaxed boxy streetwear fit as seen in the lookbook.",
    images: ["/products/armed-camo.webp", "/slide-7.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "underated-dangerous",
    handle: "underated-dangerous",
    title: "Dangerous Pink Camo Tee",
    price_ngn: 45000,
    details:
      "Optic white heavyweight combed cotton tee with razor-sharp pink camo UNDERATED chest insignia. Signature boxy silhouette with reinforced ribbed collar as seen in the lookbook.",
    images: ["/products/dangerous-pink-camo.webp", "/slide-8.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "underated-state",
    handle: "underated-state",
    title: "Underated State Tee",
    price_ngn: 45000,
    details:
      "Jet black heavyweight 240 GSM cotton tee featuring distressed industrial block stencil UNDERATED lettering across chest. Clean essential streetwear staple.",
    images: ["/products/state-logo.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "underated-highway-piece",
    handle: "underated-highway-piece",
    title: "Highway Piece Tee",
    price_ngn: 48000,
    details:
      "Heavyweight boxy cotton tee featuring monumental architectural stipple artwork of the iconic Lekki-Ikoyi cable bridge with right sleeve RATED signature hit.",
    images: ["/products/highway-piece.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "underated-street-swag",
    handle: "underated-street-swag",
    title: "Street Swag Jersey",
    price_ngn: 55000,
    details:
      "Sublimated technical mesh football jersey with knit polo collar, V-neck insert, URD badge, Lagos NG insignia, and FLY ASF / SWAG sleeve graphics.",
    images: ["/products/street-swag.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "jerseys",
  },
  {
    id: "underated-cuffs",
    handle: "underated-cuffs",
    title: "Underated Cuffs Longsleeve",
    price_ngn: 52000,
    details:
      "Layered double-sleeve tee featuring heavy black tee body with gothic tribal UNDERATED chrome chest logo and contrast white long sleeves with full sleeve tribal graphics.",
    images: ["/products/cuffs-longsleeve.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "longsleeves",
  },
  {
    id: "underated-timeless-black",
    handle: "underated-timeless-black",
    title: "Timeless Tee (Black)",
    price_ngn: 48000,
    details:
      "Vintage washed charcoal black 240 GSM heavy combed cotton tee. Subtle acid wash patina with iconic airbrushed profile stipple graphics.",
    images: ["/products/timeless-black.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "comic-burst-tee",
    handle: "comic-burst-tee",
    title: "Comic Burst Graphic Tee",
    price_ngn: 48000,
    details:
      "Heavyweight 250 GSM premium cotton tee featuring high-density explosive comic UNDERATED graphics on chest. Drop shoulder oversized streetwear fit with reinforced ribbed collar.",
    images: ["/slide-6.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "acid-wash-hoodie",
    handle: "acid-wash-hoodie",
    title: "Acid Wash Hoodie",
    price_ngn: 78000,
    details:
      "450 GSM French terry cotton with custom vintage acid wash treatment. Double-lined hood without drawstrings, dropped shoulders, relaxed boxy drape.",
    images: ["/hoodie-black.jpg"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "hoodies",
  },
];

// In-memory catalog cache for lightning-fast sub-millisecond responses
let memoryCatalog: Product[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000;

async function fetchFromSupabaseWithTimeout(): Promise<Product[] | null> {
  const timeoutPromise = new Promise<null>((resolve) =>
    setTimeout(() => resolve(null), 800)
  );

  const queryPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data) return null;

      return data.map((item) => ({
        ...item,
        images:
          item.images && item.images.length > 0
            ? item.images
            : DEFAULT_PRODUCTS.find((d) => d.handle === item.handle)?.images || [
                "/editorial-streetwear.jpg",
              ],
      })) as Product[];
    } catch {
      return null;
    }
  })();

  return Promise.race([queryPromise, timeoutPromise]);
}

async function getAllProductsMerged(): Promise<Product[]> {
  const now = Date.now();
  if (memoryCatalog && now - lastCacheTime < CACHE_TTL_MS) {
    return memoryCatalog;
  }

  const remote = await fetchFromSupabaseWithTimeout();
  let merged: Product[] = [];

  if (remote && remote.length > 0) {
    merged = [...remote];
  }

  // Complement any missing default products
  for (const def of DEFAULT_PRODUCTS) {
    if (!merged.some((p) => p.handle === def.handle)) {
      merged.push(def);
    }
  }

  memoryCatalog = merged;
  lastCacheTime = now;
  return merged;
}

export async function getProducts(collection: string, page = 1) {
  const normCol = collection.toLowerCase();
  const isAll = normCol === "all" || normCol === "frontpage";

  try {
    const all = await getAllProductsMerged();
    let filtered = all;

    if (!isAll && normCol !== "new") {
      filtered = all.filter((p) => p.collection === normCol);
    }

    const start = (page - 1) * PER_PAGE;
    const paginated = filtered.slice(start, start + PER_PAGE);
    const hasNext = filtered.length > page * PER_PAGE;

    return { products: paginated, hasNext };
  } catch (err) {
    console.error("getProducts error:", err);
    let list = DEFAULT_PRODUCTS;
    if (!isAll && normCol !== "new") {
      list = list.filter((p) => p.collection === normCol);
    }
    return { products: list, hasNext: false };
  }
}

export async function getProduct(handle: string) {
  try {
    const all = await getAllProductsMerged();
    const hit = all.find((p) => p.handle === handle);
    if (hit) return hit;
  } catch (err) {
    console.error("getProduct error:", err);
  }

  return DEFAULT_PRODUCTS.find((p) => p.handle === handle) || null;
}

export async function getEditorial() {
  try {
    const { data, error } = await supabase
      .from("editorial")
      .select("url")
      .order("sort");

    if (error) return [];
    return (data ?? []).map((r) => r.url as string);
  } catch {
    return [];
  }
}
