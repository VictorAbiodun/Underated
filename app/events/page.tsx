import { supabase } from "@/lib/supabase";
export const revalidate = 300;
export const metadata = { title: "EVENTS / UNDERATED" };
export default async function Events() {
  const { data } = await supabase.from("events").select("*").order("date");
  const fmt = (d: string) => new Date(d).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });
  return (
    <main className="px-5 pb-8 pt-4 md:px-16">
      <h1 className="mb-8 text-5xl font-extrabold tracking-tighter md:text-7xl">EVENTS</h1>
      {!data?.length && <p className="text-xs text-mute">No events announced yet.</p>}
      {data?.map((e) => {
        const row = <div className="grid grid-cols-[110px_1fr] gap-4 border-t border-line py-5 text-sm md:grid-cols-[180px_1fr_auto]"><span className="text-mute">{fmt(e.date)}</span><span className="font-bold">{e.title}</span><span className="col-start-2 text-mute md:col-start-3">{e.city}</span></div>;
        return e.url ? <a key={e.id} href={e.url} className="block hover:text-red">{row}</a> : <div key={e.id}>{row}</div>;
      })}
    </main>
  );
}
