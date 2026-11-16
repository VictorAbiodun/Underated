import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  const { data } = await supabase.from("products").select("handle");
  const pages = ["", "/collections/new", "/collections/all", "/info", "/events", "/archives"].map((p) => ({ url: base + p }));
  return [...pages, ...(data ?? []).map((p) => ({ url: `${base}/products/${p.handle}` }))];
}
