import Link from "next/link";
import Image from "next/image";

import { formatPrice } from "@/lib/utils";

export function SectionIntro({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{description}</p>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="section page-hero">
      <div className="container">
        <div className="card page-hero__card">
          <div className="page-hero__grid">
            <div className="stack">
              <span className="eyebrow">{eyebrow}</span>
              <h1 className="section-title">{title}</h1>
              <p>{description}</p>
              {actions ? <div className="btn-row">{actions}</div> : null}
            </div>
            <div className="page-hero__visual">
              <Image
                src="/images/quartz-hero-editorial.svg"
                alt="Премиальная композиция из кварцевого агломерата"
                width={1600}
                height={1000}
              />
              <div className="page-hero__badge">Quartz. Detail. Installation.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MediaCard({
  href,
  title,
  description,
  label,
  price,
  meta,
  imageUrl
}: {
  href: string;
  title: string;
  description: string;
  label?: string;
  price?: number;
  meta?: string;
  imageUrl?: string;
}) {
  return (
    <article className="card media-card">
      {imageUrl ? (
        <Image className="media-image" src={imageUrl} alt={title} width={800} height={500} />
      ) : (
        <div className="media-placeholder" aria-hidden="true" />
      )}
      <div className="media-card__content stack">
        {label ? <span className="eyebrow">{label}</span> : null}
        <h3>{title}</h3>
        <p>{description}</p>
        {meta ? <span className="muted">{meta}</span> : null}
        <div className="btn-row">
          {price ? <span className="pill">от {formatPrice(price)} руб.</span> : null}
          <Link className="button-ghost" href={href}>
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Pagination({
  page,
  totalPages,
  makeHref
}: {
  page: number;
  totalPages: number;
  makeHref: (pageNumber: number) => string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <Link
          key={pageNumber}
          className={pageNumber === page ? "button" : "button-secondary"}
          href={makeHref(pageNumber)}
        >
          {pageNumber}
        </Link>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card stack">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
