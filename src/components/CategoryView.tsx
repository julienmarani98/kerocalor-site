import Link from "next/link";
import { notFound } from "next/navigation";
import { Soul, souls } from "@/lib/site-config";
import { getProductsByCategory, getSettings } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import ContactCTA from "@/components/ContactCTA";

export default async function CategoryView({ soul, slug }: { soul: Soul; slug: string }) {
  const cat = souls[soul].categories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const [products, settings] = await Promise.all([getProductsByCategory(slug), getSettings()]);

  return (
    <>
      <section className="border-b border-line bg-ash">
        <div className="container-site py-12 sm:py-16 lg:py-20">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-steel">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href={`/${soul}`} className="hover:text-ink">{souls[soul].title}</Link>
            <span>/</span>
            <span className="text-ink">{cat.name}</span>
          </nav>
          <h1 className="h-display">{cat.name}</h1>
          <p className="mt-5 max-w-xl text-base text-ink/75 sm:text-lg">{cat.blurb}</p>
        </div>
      </section>

      <section className="container-site py-12 sm:py-16 lg:py-20">
        <ProductGrid products={products} settings={settings} />
        <p className="mt-12 max-w-2xl text-sm text-steel">
          Gli articoli mostrati sono indicativi: il catalogo viene aggiornato di
          continuo. Non trovi quello che cerchi? Scrivici, abbiamo molto altro in
          esposizione.
        </p>
      </section>

      <ContactCTA title="Ti interessa un modello?" text="Contattaci per disponibilità, prezzo e sopralluogo gratuito. Rispondiamo via WhatsApp o email." />
    </>
  );
}
