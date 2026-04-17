"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

import type { Testimonial } from "@/types/content";

export function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  const current = items[index];

  return (
    <div className="slider card stack">
      <div className="pill-list">
        {Array.from({ length: current.rating }, (_, starIndex) => (
          <Star key={starIndex} size={18} fill="currentColor" />
        ))}
      </div>
      <p>{current.quote}</p>
      <div className="stack" style={{ gap: 4 }}>
        <strong>{current.author}</strong>
        <span className="muted">{current.role}</span>
      </div>
      <div className="slider__controls">
        <button
          className="slider__button"
          type="button"
          onClick={() => setIndex((value) => (value - 1 + items.length) % items.length)}
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          className="slider__button"
          type="button"
          onClick={() => setIndex((value) => (value + 1) % items.length)}
          aria-label="Следующий отзыв"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
