import Image from "next/image";
export default function Pic({ src, alt, sizes, priority }: { src?: string; alt: string; sizes: string; priority?: boolean }) {
  return src ? <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" /> : <div className="h-full w-full bg-ph" />;
}
