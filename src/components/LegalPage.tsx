/** Impaginazione comune alle pagine legali (privacy, cookie, note legali). */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-line bg-ash">
        <div className="container-site py-12 sm:py-16">
          <p className="kicker text-steel">Informazioni legali</p>
          <h1 className="h-display mt-5">{title}</h1>
          <p className="mt-5 text-[11px] uppercase tracking-[0.12em] text-steel">
            Ultimo aggiornamento: {updated}
          </p>
        </div>
      </section>

      <section className="container-site py-12 sm:py-16">
        <div className="legal-prose max-w-3xl">{children}</div>
      </section>
    </>
  );
}
