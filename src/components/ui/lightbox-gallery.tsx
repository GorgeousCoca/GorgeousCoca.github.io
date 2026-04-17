"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function LightboxGallery({
  items,
  title
}: {
  items: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-3">
        {items.map((item, index) => (
          <button
            key={`${item}-${index}`}
            className="card media-card"
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Открыть изображение ${index + 1}`}
          >
            <div className="media-placeholder" />
            <div className="media-card__content">
              <strong>{title}</strong>
              <p>Фото проекта {index + 1}</p>
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          <div className="lightbox__content card stack">
            <div className="btn-row" style={{ justifyContent: "space-between" }}>
              <strong>{title}</strong>
              <button
                className="button-secondary"
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Закрыть галерею"
              >
                <X size={18} />
              </button>
            </div>
            <div className="media-placeholder" style={{ minHeight: 420 }} />
            <p>Просмотр изображения {activeIndex + 1}. При подключении реального контента здесь будут фото объекта.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
