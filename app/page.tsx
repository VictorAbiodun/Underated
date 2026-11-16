import HeroSlider from "@/components/HeroSlider";

export const revalidate = 60;

export default function Home() {
  return (
    <main className="bg-black text-white">
      <HeroSlider />
    </main>
  );
}
