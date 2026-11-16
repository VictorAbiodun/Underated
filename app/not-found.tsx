import Link from "next/link";
export default function NotFound() {
  return <main className="px-5 py-24 md:px-16"><h1 className="text-6xl font-extrabold tracking-tighter md:text-9xl">404</h1><p className="mt-4 text-xs text-mute">That page does not exist.</p><Link href="/collections/new" className="mt-8 inline-block text-xs font-bold tracking-[.25em] underline">SHOP NEW</Link></main>;
}
