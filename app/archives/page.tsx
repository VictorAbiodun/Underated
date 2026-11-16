import Pic from "@/components/Pic";
import { supabase } from "@/lib/supabase";
export const revalidate = 300;
export const metadata = { title: "ARCHIVES / UNDERATED" };
export default async function Archives() {
  const { data } = await supabase.from("archives").select("*").order("year", { ascending: false });
  return (
    <main className="px-5 pb-8 pt-4 md:px-16">
      <h1 className="mb-8 text-5xl font-extrabold tracking-tighter md:text-7xl">ARCHIVES</h1>
      {!data?.length && <p className="text-xs text-mute">Past drops will live here.</p>}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {data?.map((a) => (
          <section key={a.id}>
            <div className="mb-2 flex justify-between text-[13px] font-bold"><h2>{a.title}</h2><span className="text-red">{a.year}</span></div>
            <div className="relative aspect-[4/5] bg-ph"><Pic src={a.images[0]} alt={a.title} sizes="(min-width:768px) 50vw, 100vw" /></div>
          </section>
        ))}
      </div>
    </main>
  );
}
