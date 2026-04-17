"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { estimatePrice } from "@/lib/calc/calculator";
import { formatPrice } from "@/lib/utils";

export function CalculatorForm() {
  const [length, setLength] = useState(2400);
  const [width, setWidth] = useState(600);
  const [material, setMaterial] = useState<"quartz" | "acrylic">("quartz");
  const [thickness, setThickness] = useState<"12" | "20" | "30">("20");
  const [sinkCutout, setSinkCutout] = useState(true);
  const [hobCutout, setHobCutout] = useState(false);

  const price = useMemo(
    () => estimatePrice({ length, width, material, thickness, sinkCutout, hobCutout }),
    [hobCutout, length, material, sinkCutout, thickness, width]
  );

  const query = new URLSearchParams({
    message: `Расчет с калькулятора: ${length}x${width} мм, материал ${material}, толщина ${thickness} мм, мойка ${sinkCutout ? "да" : "нет"}, варочная панель ${hobCutout ? "да" : "нет"}`
  }).toString();

  return (
    <div className="grid grid-2">
      <form className="card stack">
        <div className="form-grid">
          <label className="stack">
            <span>Длина, мм</span>
            <input
              className="field"
              min={500}
              step={100}
              type="number"
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
            />
          </label>
          <label className="stack">
            <span>Ширина, мм</span>
            <input
              className="field"
              min={300}
              step={50}
              type="number"
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
            />
          </label>
          <label className="stack">
            <span>Материал</span>
            <select
              className="select"
              value={material}
              onChange={(event) => setMaterial(event.target.value as "quartz" | "acrylic")}
            >
              <option value="quartz">Кварцевый агломерат</option>
              <option value="acrylic">Акриловый камень</option>
            </select>
          </label>
          <label className="stack">
            <span>Толщина</span>
            <select
              className="select"
              value={thickness}
              onChange={(event) => setThickness(event.target.value as "12" | "20" | "30")}
            >
              <option value="12">12 мм</option>
              <option value="20">20 мм</option>
              <option value="30">30 мм</option>
            </select>
          </label>
        </div>
        <label className="pill">
          <input checked={sinkCutout} type="checkbox" onChange={() => setSinkCutout((value) => !value)} />
          &nbsp;Вырез под мойку
        </label>
        <label className="pill">
          <input checked={hobCutout} type="checkbox" onChange={() => setHobCutout((value) => !value)} />
          &nbsp;Вырез под варочную панель
        </label>
      </form>

      <div className="price-box">
        <span>Примерная стоимость</span>
        <strong style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>{formatPrice(price)} руб.</strong>
        <p style={{ color: "rgba(255,255,255,0.8)" }}>
          Итог зависит от профиля, количества вырезов, логистики и сложности монтажа.
        </p>
        <div className="btn-row">
          <Link className="button-secondary" href={`/contacts?${query}`}>
            Оформить заявку
          </Link>
          <Link className="button-ghost" href="/services">
            Смотреть услуги
          </Link>
        </div>
      </div>
    </div>
  );
}
