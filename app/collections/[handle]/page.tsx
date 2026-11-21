import ShopView from "@/components/ShopView";
import { getProducts } from "@/lib/products";

export const revalidate = 120;

export function generateStaticParams() {
  return [
    { handle: "all" },
    { handle: "frontpage" },
    { handle: "new" },
    { handle: "tees" },
    { handle: "jerseys" },
    { handle: "longsleeves" },
    { handle: "hoodies" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const title = (handle === "frontpage" ? "ALL" : handle).toUpperCase();
  return {
    title: `${title} / UNDERATED`,
    description: `Shop ${title} from UNDERATED.`,
  };
}

export default async function Collection({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { handle } = await params;
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const { products, hasNext } = await getProducts(handle, page);

  return (
    <main>
      <ShopView
        handle={handle}
        products={products}
        hasNext={hasNext}
        page={page}
      />
    </main>
  );
}
