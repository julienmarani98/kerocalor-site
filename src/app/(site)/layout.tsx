import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealManager from "@/components/RevealManager";
import { getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <RevealManager />
      <Header settings={settings} />
      <main className="min-h-screen pt-[var(--header-h)]">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
