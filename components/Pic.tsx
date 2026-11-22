import Image from "next/image";
export default function Pic({
  src,
  alt,
  sizes,
  priority,
  contain,
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  contain?: boolean;
}) {
  return src ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      className={contain ? "object-contain" : "object-cover"}
    />
  ) : (
    <div className="h-full w-full bg-ph" />
  );
}
