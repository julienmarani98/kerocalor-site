import CategoryView from "@/components/CategoryView";

export default function Page({ params }: { params: { category: string } }) {
  return <CategoryView soul="stufe" slug={params.category} />;
}
