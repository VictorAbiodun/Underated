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
 * Curated catalog of all brand pieces.
 * Used as source of truth and instant fallback so requests are never blocked.
 */
export const DEFAULT_PRODUCTS: Product[] = [
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
    id: "camo-logo-tee",
    handle: "camo-logo-tee",
    title: "Camo Boxy Tee",
    price_ngn: 45000,
    details:
      "Heavyweight 240 GSM combed cotton featuring vintage woodland camo UNDERATED lettering across chest. Relaxed boxy silhouette tailored for everyday streetwear wear.",
    images: ["/slide-7.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "pink-camo-tee",
    handle: "pink-camo-tee",
    title: "Pink Camo Boxy Tee",
    price_ngn: 45000,
    details:
      "Clean optic white tee with razor-sharp pink camo UNDERATED chest print. Signature boxy cut with reinforced collar and twin-needle hem stitching.",
    images: ["/slide-8.webp"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "star-burn-tee",
    handle: "star-burn-tee",
    title: "Star Burn Graphic Tee",
    price_ngn: 48000,
    details:
      "Mineral wash black heavy cotton boxy tee. Features 'To become a star, you must burn' celestial stipple graphic on front with signature star back print.",
    images: ["/star-burn-tee.jpg"],
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
  {
    id: "core-logo-tee",
    handle: "core-logo-tee",
    title: "Core Logo Tee",
    price_ngn: 45000,
    details:
      "Heavyweight cotton, oversized fit, minimal UNDERATED branding across chest with woven hem label.",
    images: ["/graphic-tee.jpg"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "tees",
  },
  {
    id: "cargo-pants",
    handle: "cargo-pants",
    title: "Cargo Pants",
    price_ngn: 65000,
    details:
      "Relaxed cargo cut with six modular pockets, durable tactical twill, adjustable ankle cinch cords.",
    images: ["/editorial-streetwear.jpg"],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5, XXL: 0 },
    collection: "bottoms",
  },
];

// In-memory catalog cache for lightning-fast sub-millisecond responses
let memoryCatalog: Product[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

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
    } else if (normCol === "new") {
      filtered = all.filter(
        (p) => p.collection === "tees" || p.collection === "new"
      );
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
