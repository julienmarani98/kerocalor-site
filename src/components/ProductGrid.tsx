import type { StoredProduct, Settings } from "@/lib/store";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  settings,
}: {
  products: StoredProduct[];
  settings: Settings;
}) {
  if (!products.length) {
    return (
      <p className="py-20 text-center text-sm uppercase tracking-[0.14em] text-steel">
        Catalogo in aggiornamento.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <div
          key={p.id}
          data-reveal
          style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
        >
          <ProductCard p={p} settings={settings} />
        </div>
      ))}
    </div>
  );
}
