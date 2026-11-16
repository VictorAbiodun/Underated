export default function Ticker() {
  const t = "UNDERATED  /  NEW DROP  /  ".repeat(8);
  return <div className="h-7 overflow-hidden whitespace-nowrap bg-red text-[11px] font-bold leading-7 tracking-[.25em] text-black" aria-hidden>{t}</div>;
}
