import CategoryView from "@/components/CategoryView";
import { souls } from "@/lib/site-config";

export function generateStaticParams() {
  return souls.arredamento.categories.map((c) => ({ category: c.slug }));
}

export default function Page({ params }: { params: { category: string } }) {
  return <CategoryView soul="arredamento" slug={params.category} />;
}
