import Link from "next/link";

import { SiteHeader } from "@/components/layout/site-header";
import { getSettings } from "@/lib/site";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <div className="site-shell">
      <SiteHeader settings={settings} />
      <main className="site-main">{children}</main>
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="stack">
              <strong>{settings.companyName}</strong>
              <p>
                Изделия из искусственного камня на заказ для частных и коммерческих интерьеров в
                Санкт-Петербурге.
              </p>
            </div>
            <div className="stack">
              <strong>Разделы</strong>
              <Link href="/catalog">Каталог изделий</Link>
              <Link href="/catalog-kamnya">Каталог камня</Link>
              <Link href="/portfolio">Портфолио</Link>
              <Link href="/blog">Блог</Link>
            </div>
            <div className="stack">
              <strong>Контакты</strong>
              <span>{settings.phone}</span>
              <span>{settings.email}</span>
              <span>{settings.address}</span>
            </div>
            <div className="stack">
              <strong>Документы</strong>
              <Link href="/privacy">Политика конфиденциальности</Link>
              <Link href="/services">Услуги и цены</Link>
              <Link href="/calculator">Калькулятор</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
