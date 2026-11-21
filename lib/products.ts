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
 * Used as source of truth and fallback if remote DB is missing any recent pieces.
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

export async function getProducts(collection: string, page = 1) {
  const normCol = collection.toLowerCase();
  const isAll = normCol === "all" || normCol === "frontpage";

  try {
    let q = supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (!isAll && normCol !== "new") {
      q = q.eq("collection", normCol);
    }

    const { data, count, error } = await q;

    let list: Product[] = [];
    if (!error && data && data.length > 0) {
      list = data.map((item) => ({
        ...item,
        // Ensure image fallback if DB has empty images array
        images:
          item.images && item.images.length > 0
            ? item.images
            : DEFAULT_PRODUCTS.find((d) => d.handle === item.handle)?.images || [
                "/editorial-streetwear.jpg",
              ],
      }));
    }

    // Merge default products for any handles not in DB
    for (const def of DEFAULT_PRODUCTS) {
      if (!list.some((p) => p.handle === def.handle)) {
        if (
          isAll ||
          (normCol === "new" && def.collection === "tees") ||
          def.collection === normCol
        ) {
          list.push(def);
        }
      }
    }

    // Filter by category if requested
    if (!isAll && normCol !== "new") {
      list = list.filter((p) => p.collection === normCol);
    }

    const start = (page - 1) * PER_PAGE;
    const paginated = list.slice(start, start + PER_PAGE);
    const hasNext = list.length > page * PER_PAGE;

    return { products: paginated, hasNext };
  } catch (err) {
    console.error("getProducts error:", err);
    // Graceful fallback to static products
    let list = DEFAULT_PRODUCTS;
    if (!isAll && normCol !== "new") {
      list = list.filter((p) => p.collection === normCol);
    }
    return { products: list, hasNext: false };
  }
}

export async function getProduct(handle: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("handle", handle)
      .maybeSingle();

    if (!error && data) {
      return {
        ...data,
        images:
          data.images && data.images.length > 0
            ? data.images
            : DEFAULT_PRODUCTS.find((d) => d.handle === handle)?.images || [
                "/editorial-streetwear.jpg",
              ],
      } as Product;
    }
  } catch (err) {
    console.error("getProduct error:", err);
  }

  // Fallback to static catalog
  return DEFAULT_PRODUCTS.find((p) => p.handle === handle) || null;
}

export async function getEditorial() {
  try {
    const { data, error } = await supabase
      .from("editorial")
      .select("url")
      .order("sort");

    if (error) {
      console.error("getEditorial error:", error.message);
      return [];
    }
    return (data ?? []).map((r) => r.url as string);
  } catch (err) {
    console.error("getEditorial error:", err);
    return [];
  }
}
