import type { StoneSample } from "@/types/content";

type PrimaxSeed = {
  code: string;
  name: string;
  color: string;
  texture: string;
  finish: string;
  thicknesses: string[];
  priceFrom?: number;
};

const primaxSeeds: PrimaxSeed[] = [
  { code: "100", name: "Ivory White", color: "Белый", texture: "Однородная", finish: "Полированная", thicknesses: ["20 мм"], priceFrom: 12678 },
  { code: "111", name: "Snow White", color: "Белый", texture: "Однородная", finish: "Полированная", thicknesses: ["20 мм"], priceFrom: 12990 },
  { code: "111", name: "Snow White (Мат)", color: "Белый", texture: "Однородная", finish: "Матовая", thicknesses: ["20 мм"], priceFrom: 15642 },
  { code: "112", name: "Crystal White", color: "Светло-серый", texture: "Однородная", finish: "Полированная", thicknesses: ["20 мм"], priceFrom: 11431 },
  { code: "120", name: "Light Grey (Мат)", color: "Серый", texture: "Однородная", finish: "Матовая", thicknesses: ["20 мм"], priceFrom: 11119 },
  { code: "130", name: "Beige Sand (Мат)", color: "Бежевый", texture: "Однородная", finish: "Матовая", thicknesses: ["20 мм"], priceFrom: 15642 },
  { code: "150", name: "Black Satin (Мат)", color: "Черный", texture: "Однородная", finish: "Матовая", thicknesses: ["20 мм"], priceFrom: 23596 },
  { code: "312", name: "Patagonia", color: "Светлый микс", texture: "Мраморная", finish: "Полированная", thicknesses: ["20 мм"], priceFrom: 23596 },
  { code: "313", name: "White Arctic (Мат)", color: "Светло-серый", texture: "Каменная", finish: "Матовая", thicknesses: ["20 мм"], priceFrom: 23596 },
  { code: "331", name: "Panda White", color: "Белый", texture: "Контрастная прожилка", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "335", name: "Tiffani Blue", color: "Голубой микс", texture: "Каменная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "340", name: "Taj Mahal", color: "Бежевый", texture: "Мраморная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "345", name: "Black Sea", color: "Черный", texture: "Каменная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "702", name: "Light Calacatta", color: "Белый", texture: "Крупная прожилка", finish: "Полированная", thicknesses: ["20 мм", "30 мм"] },
  { code: "703", name: "Rich Calacatta", color: "Белый", texture: "Крупная прожилка", finish: "Полированная", thicknesses: ["20 мм", "30 мм"] },
  { code: "704", name: "Arabescata White", color: "Белый", texture: "Мраморная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "706", name: "Calacatta Grey (Мат)", color: "Серый", texture: "Мраморная", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "719", name: "Earthquake (Мат)", color: "Темно-серый", texture: "Каменная", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "722", name: "Calacatta Warm Venatto (Мат)", color: "Бежевый", texture: "Крупная прожилка", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "723", name: "Calacatta Gold", color: "Белый", texture: "Крупная прожилка", finish: "Полированная", thicknesses: ["20 мм", "30 мм"] },
  { code: "726", name: "Virtrum Crystal", color: "Светло-серый", texture: "Каменная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "740", name: "Rainbow Calacatta", color: "Белый", texture: "Крупная прожилка", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "770", name: "Sahara Noir", color: "Черный", texture: "Контрастная прожилка", finish: "Полированная", thicknesses: ["20 мм", "30 мм"] },
  { code: "786", name: "Calacatta Back Gold", color: "Черный", texture: "Крупная прожилка", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "796", name: "Noir Satin (Мат)", color: "Черный", texture: "Однородная", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "812", name: "Black Rock (Мат)", color: "Черный", texture: "Каменная", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "826", name: "Concrete Grey (Мат)", color: "Серый", texture: "Бетонная", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "833", name: "TerraCotta (Мат)", color: "Терракотовый", texture: "Каменная", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "848", name: "White Oxid (Мат)", color: "Белый", texture: "Каменная", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "884", name: "Dark Concrete (Мат)", color: "Темно-серый", texture: "Бетонная", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "892", name: "Grey Oxid (Мат)", color: "Серый", texture: "Каменная", finish: "Матовая", thicknesses: ["20 мм"] },
  { code: "912", name: "White Carrara", color: "Белый", texture: "Мраморная", finish: "Полированная", thicknesses: ["20 мм", "30 мм"] },
  { code: "913", name: "Golden Sunset", color: "Теплый бежевый", texture: "Крупная прожилка", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "915", name: "Dark Mist", color: "Темно-серый", texture: "Каменная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "916", name: "Emperador", color: "Коричневый", texture: "Мраморная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "920", name: "White Marble", color: "Белый", texture: "Мраморная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "931", name: "Sunny Carrara", color: "Светлый бежевый", texture: "Мраморная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "942", name: "Ivory Grey", color: "Серо-бежевый", texture: "Каменная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "961", name: "Ice Storm", color: "Светло-серый", texture: "Каменная", finish: "Полированная", thicknesses: ["20 мм"] },
  { code: "971", name: "Ice Grey (Мат)", color: "Светло-серый", texture: "Каменная", finish: "Матовая", thicknesses: ["20 мм"] }
];

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/\(мат\)/g, "mat")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const primaxStones: StoneSample[] = primaxSeeds.map((seed, index) => ({
  id: `stone_primax_${seed.code}_${index + 1}`,
  slug: `primax-${seed.code}-${toSlug(seed.name)}`,
  title: `${seed.code} ${seed.name}`,
  stoneType: "quartz",
  manufacturer: "Primax",
  color: seed.color,
  texture: seed.texture,
  thicknesses: seed.thicknesses,
  finish: seed.finish,
  description:
    "Кварцевый агломерат Primax для кухонь, ванных и коммерческих поверхностей. Подходит для проектов с акцентом на долговечность и премиальную эстетику.",
  image: "/images/quartz-surface-light.svg",
  isFeatured: ["723", "702", "770", "312", "111"].includes(seed.code),
  priceFrom: null
}));
