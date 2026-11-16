import { supabase } from "./supabase";
export type Product = { id: string; handle: string; title: string; price_ngn: number; details: string | null; images: string[]; sizes: Record<string, number>; collection: string };
export const PER_PAGE = 12;
export const naira = (n: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

export async function getProducts(collection: string, page = 1) {
  try {
    let q = supabase.from("products").select("*", { count: "exact" }).order("created_at", { ascending: false }).range((page - 1) * PER_PAGE, page * PER_PAGE - 1);
    if (collection !== "all") q = q.eq("collection", collection);
    const { data, count, error } = await q;
    if (error) {
      console.error("getProducts error:", error.message);
      return { products: [], hasNext: false };
    }
    return { products: (data ?? []) as Product[], hasNext: (count ?? 0) > page * PER_PAGE };
  } catch (err) {
    console.error("getProducts error:", err);
    return { products: [], hasNext: false };
  }
}
export async function getProduct(handle: string) {
  try {
    const { data, error } = await supabase.from("products").select("*").eq("handle", handle).maybeSingle();
    if (error) {
      console.error("getProduct error:", error.message);
      return null;
    }
    return data as Product | null;
  } catch (err) {
    console.error("getProduct error:", err);
    return null;
  }
}
export async function getEditorial() {
  try {
    const { data, error } = await supabase.from("editorial").select("url").order("sort");
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
