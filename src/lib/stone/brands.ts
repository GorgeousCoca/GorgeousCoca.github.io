import type { StoneSample } from "@/types/content";

export type StoneBrand = {
  slug: string;
  name: string;
  description: string;
  count: number;
};

const brandDescriptions: Record<string, string> = {
  primax:
    "PRIMAX — современный бренд, предлагающий кварцевый камень с высоким качеством материалов и длительным сроком службы. В коллекции представлены однотонные и мраморные декоры, а также уникальные цветовые решения и текстуры для оригинальных дизайнерских задач.",
  radianz:
    "Radianz — стабильные кварцевые декоры для проектов, где важны практичность, визуальная чистота и предсказуемый результат.",
  caesarstone:
    "Caesarstone — премиальный кварцевый камень для современных интерьеров с акцентом на тактильность и графику поверхности.",
  technistone:
    "Technistone — европейские кварцевые решения с выразительной текстурой и хорошей повторяемостью оттенков.",
  avant:
    "Avant Quartz — популярные декоры кварца для кухонь, ванных и общественных пространств.",
  vicostone:
    "Vicostone — дизайнерские поверхности с выразительной мраморной структурой и высокой прочностью.",
  avarus:
    "AVARUS — доступный кварцевый агломерат с популярными мраморными декорами в глянцевых и матовых версиях.",
  smart:
    "Smart Quartz — практичный кварцевый агломерат для кухонь, ванных и интерьерных поверхностей с широкой палитрой декоров.",
  noblle:
    "Noblle Quartz — сочетание доступной стоимости и современных декоров для жилых и коммерческих интерьеров.",
  etna:
    "Etna Quartz — кварцевый агломерат с технологичным производством и большим выбором мраморных и каменных структур.",
  "still-stone":
    "Still Stone — кварцевый агломерат с акцентом на стабильность характеристик и сертифицированную безопасность.",
  belenco:
    "Belenco — международный бренд кварцевых поверхностей с большим количеством однотонных и мраморных коллекций.",
  asterum:
    "Asterum — бренд кварцевого агломерата с актуальными декорами и широким размерным рядом слэбов.",
  quantra:
    "Quantra Quartz — кварцевый агломерат на базе высококачественного кварца и технологий Bretonstone.",
  "aleph-stone":
    "Aleph Stone — премиальные кварцевые декоры с выраженной натуральной графикой и современным характером."
};

export function manufacturerToSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/quartz/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getStoneBrands(stones: StoneSample[]): StoneBrand[] {
  const groups = new Map<string, { name: string; count: number }>();

  for (const stone of stones) {
    const slug = manufacturerToSlug(stone.manufacturer);
    const existing = groups.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      groups.set(slug, { name: stone.manufacturer, count: 1 });
    }
  }

  return [...groups.entries()]
    .map(([slug, value]) => ({
      slug,
      name: value.name,
      count: value.count,
      description: brandDescriptions[slug] ?? "Каталог кварцевого агломерата бренда с актуальными декорами и ценами."
    }))
    .sort((a, b) => b.count - a.count);
}
