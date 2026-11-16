const col = (h: string, items: string[]) => (
  <div><h3 className="mb-3 text-xs font-bold tracking-[.15em]">{h}</h3>{items.map((i) => <p key={i} className="mb-2 text-[13px] text-mute">{i}</p>)}</div>
);
export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-b from-bg to-[#170000] px-5 pb-8 pt-12 md:px-16 md:pt-16">
      <div className="flex flex-wrap gap-x-12 gap-y-8 md:gap-x-40">
        {col("CONTACT US", ["hello@underated.com"])}
        {col("FOLLOW", ["Instagram", "YouTube", "TikTok", "Pinterest"])}
        {col("LEGAL", ["Terms of service", "Privacy policy"])}
      </div>
      <p className="mt-10 text-[17vw] font-extrabold leading-none tracking-tighter md:text-[9rem]" style={{ WebkitTextStroke: "1px #8a8a8a", color: "transparent" }}>UNDERATED</p>
    </footer>
  );
}
