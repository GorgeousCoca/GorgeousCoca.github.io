import type { StoneSample } from "@/types/content";

/** Каталог кварца: все бренды с явными ценами (₽/м²) */

const STONE_DESCRIPTION = (brand: string) =>
  `Кварцевый агломерат ${brand} для кухонь, ванных и коммерческих пространств.`;

type TitleListGroup = {
  manufacturer: string;
  items: string[];
};

type QuartzCatalogRow = {
  manufacturer: string;
  title: string;
  price: number;
  featured?: boolean;
};

const IMAGE_FOLDER_MAP: Record<string, string> = {
  "Avant Quartz": "Avant_Quartz",
  Avarus: "Avarus",
  "Smart Quartz": "Smart_Quartz",
  "Noblle Quartz": "Noblle_Quartz",
  "Etna Quartz": "Etna_Quartz",
  Caesarstone: "Caesarstone",
  Technistone: "Technistone",
  "Still Stone": "Still_Stone",
  Belenco: "belenco/Камни Belenco",
  Asterum: "Asterum",
  Radianz: "Radianz_Quartz",
  Vicostone: "Vicostone",
  "Quantra Quartz": "Quantra_Quartz",
  "Aleph Stone": "Aleph_Stone",
  Primax: "Primax"
};

/* Все бренды с явными ценами */
const STONE_PRICES_BY_BRAND: Record<string, Record<string, number>> = {
  "Avant Quartz": {
    "1000 Дижон": 9500, "1012 Амьен": 9250, "1220 Клермон": 10500,
    "1111 Авалон": 14000, "2060 Грей Тур": 15500, "9023 Лотарингия": 15500,
    "9133 Авиньон Грис": 15500, "9603 Сен-Мало": 15500,
    "9005 Бурбонне": 17250, "9006 Лимузен": 17250, "9010 Корсика": 17250,
    "9212 Сен-Тропе": 17250, "9510 Ванилла Анси": 17250, "9050 Грис Фонсе": 17250,
    "9172 Блаве": 17250, "9173 Вилен": 17250, "8044 Эври (Матовый)": 17250,
    "8011 Нант (Матовый)": 20250, "8033 Каркассон (Матовый)": 20250,
    "8059 Лаваль (Матовый)": 20250, "8100 Мулен (Матовый)": 20250,
    "8800 Кассис (Матовый)": 20250, "8810 Ренн Тэмпл (Матовый)": 20250,
    "8811 Резе (Матовый)": 20250, "8046 Эсон (Матовый)": 20250,
    "8580 Тарн (Матовый)": 20250,
    "7000 Калакатта Эно": 18750, "7030 Калакатта Шенонсо": 18750,
    "7040 Калакатта Бомениль": 18750, "7060 Калакатта Мон Сен-Мишель": 18750,
    "7070 Калакатта Версаль": 18750, "7080 Калакатта Пьерфон": 18750,
    "7090 Калакатта Рона-Альпы": 16250, "7100 Статуарио Лилль": 18750,
    "7200 Аквитания Бланка": 18750, "7400 Калакатта Дофине": 18750,
    "7470 Калакатта Берн": 18750, "7500 Калакатта Аррас": 18750,
    "7550 Калакатта Канны Голд (Мат)": 18750, "7560 Калакатта Альби (Мат)": 18750,
    "7570 Калакатта Таланс": 18750, "7630 Калакатта Венсен": 16250,
    "7670 Калакатта Кассель": 16250, "7700 Калакатта Марсель": 18750,
    "7888 Калакатта Динан": 18750, "7970 Калакатта Труа": 18750,
    "7980 Ницца Бланк": 18750, "7985 Ницца Ноир (Мат)": 18750,
    "7810 Калакатта Модан": 18750,
    "5751 Калакатта Бессон (Print)": 18750, "5752 Калакатта Креспен (Print)": 18750,
    "5753 Калакатта Аверон (Print)": 18750, "5754 Калакатта Вивье (Print)": 18750,
    "5700 Калакатта Амели (Print)": 18750, "5750 Калакатта Шери (Print)": 18750,
    "5800 Травертин Супп (Print)": 18750
  },
  Radianz: {
    "CG910 Columbia Gray": 12250, "UG950 Ural Gray": 13250, "KI992 Kunlun Ink": 13250,
    "MS141 Mont Blanc Snow": 13250, "GG900 Gentle Gray": 13250,
    "AW130 Aleutian White": 13500, "EW120 Everest White": 13500,
    "IG910 Imperial Gray": 14000, "MI780 Mirama Bronze": 15000,
    "GG950 Gold Canyon Gray": 15500, "MU410 Mariposa Buff": 14250,
    "SH145 St.Helens White": 15500, "DW105 Diamond White": 14750,
    "PG722 Pergamon": 12750, "AZ752 Aizano": 14250, "MM211 Mocca Mousse": 14250,
    "BN178 Belluno": 14250, "VE150 Vega": 14750, "AD151 Alinda": 14750,
    "PR710 Parma": 14750, "BL260 Boletus": 14750, "GN290 Granada": 14750,
    "MG780 Metropol Grey": 14750, "CV110 Calacatta Venatino": 15250,
    "LL712 La Luna": 15500, "CR157 Carola": 15500, "AM174 Amalfi": 15500,
    "MI150 Minta": 15500, "PL187 Perla": 15500,
    "CV130 Calacatta Veneto": 19500, "CV152 Calacatta Valencia": 19500,
    "CV199 Calacatta Victory": 19500, "ML950 Marquina Lavagna": 19500,
    "AF953 Ashford Fog": 13250, "LL195 Lucern Lake": 16250,
    "DC155 Denali Cloud": 16250, "CO925 Ceres": 19000, "PL722 Pluto": 19000,
    "CO811 Contrail": 19000, "SE155 Sequoia": 17500, "AC711 Acacia": 17500,
    "CH949 Charocal": 19000, "AS955 Aster": 17750, "IB989 Impala Black": 17750,
    "NB278 Napoli Beige": 17750, "KR217 Kiani Cream": 17750,
    "WA389 Wilshire Amber": 17750, "VV254 Verona Verde": 17750,
    "RI177 Rio": 18000, "AL450 Alluring": 20000, "SP850 Splendor": 20000,
    "NW124 Nantucket Whale": 21750, "JU155 Juniper": 21750
  },
  "Noblle Quartz": {
    "Q117 Jade White": 10500, "Q131 Black Sand": 10500,
    "Q716 Carrara Sun": 13000, "Q718 Carrara Moon": 13000,
    "Q719 Carrara Black": 13000, "Q717 Bianco Giogia": 13750,
    "Q735 Bianco Venato": 13750, "Q740 Calacatta Venato": 13750,
    "Q744 Calacatta Bianco": 13750, "Q765 Nero Marquina": 13750,
    "Q785 Calacatta Gold": 13750, "Q810 Grey Glow": 15750,
    "Q811 Beton White (мат)": 15750, "Q859 Beton Brass (мат)": 15750,
    "Q880 Beton Grey (мат)": 15750, "Q703 Calacatta Borghini": 15000,
    "Q707 Sahara Noir": 15000, "Q757 Calacatta Aurum": 15000,
    "Q798 Calacatta Elegant": 15000, "Q840 White Misterio": 15000,
    "Q850 Urban Grigio": 15000, "Q795 Calacatta Magic Dark": 17500,
    "Q796 Calacatta Magic White": 17500, "Q797 Calacatta True Light": 17500,
    "Q901 Patagonia Gold": 17500, "Q902 Patagonia Platinum": 17500,
    "Q921 Arabescato Black": 17500, "Q922 Arabescato White": 17500,
    "Q923 Arabescato Corchia": 17500, "Q650 Pietra Grigia": 12250,
    "Q750 Statuario Classic": 12250, "Q790 Venato Royal": 12250
  },
  "Smart Quartz": {
    "White Sand": 11500, "Silver Night": 11500, "Sunshine": 12500,
    "Linen": 12500, "White Marble": 13500, "Super White": 13750,
    "Negro Imperial": 14250, "Illusion": 15750, "Bianco Venatino": 16750,
    "Calacatta Sun": 18250, "Calacatta Tree": 21750, "Gold Arabescato": 22250,
    "Statuario Gold": 24750, "Rockland (матовый)": 20750,
    "Coral (матовый)": 20750, "Slate (матовый)": 20750, "Antracite": 21250,
    "Marquina": 19750, "Black Jasper (матовый)": 24750, "Titanium": 28250,
    "Patagonia": 28250, "Jasmine": 25750, "Taj Mahal (матовый)": 20750,
    "Crema Marfil (Матовый)": 18500, "Coffee Brown (Матовый)": 18500,
    "Giallo": 19000, "Munsell": 20500, "Russet": 18500,
    "Moon White (Матовый)": 17750, "Moon Grey (Матовый)": 19750,
    "Bianco Lasa": 17750, "Calacatta Moon": 17250
  },
  Avarus: {
    "R112 Соль Каспия": 12000, "R122 Алмазы Якутии": 12000,
    "R104 Белая Тайга": 13000, "R515 Вулканы Камчатки": 13000,
    "R403 Скалы Карелии": 14000, "R444 Ай-Петри": 14000,
    "R500 Жемчуг Приморья": 14000, "R503 Уральские Горы": 14000,
    "R510 Черное Море": 13750, "R511 Лёд Байкала": 13750,
    "R520 Астраханские Пески": 14000, "R522 Золотое Кольцо": 14000,
    "R531 Донская Степь": 14000, "R538 Горы Кавказа": 14000,
    "R541 Снега Сибири": 13750, "R543 Пик Эльбруса": 13750,
    "R555 Балтийский Берег": 14000, "R558 Просторы Поволжья": 14000,
    "R575 Красная Поляна": 14000, "R590 Северное Сияние": 14750,
    "R677 Московская ночь": 15750,
    "RM104 Белая Тайга Мат": 16250, "RM403 Скалы Карелии Мат": 16250,
    "RM444 Ай-Петри Мат": 16250, "RM500 Жемчуг Приморья Мат": 16250,
    "RM510 Черное Море Мат": 16250, "RM511 Лёд Байкала Мат": 16250,
    "RM520 Астраханские Пески Мат": 16250, "RM543 Пик Эльбруса Мат": 16250,
    "RM560 Золотые Ворота Мат": 16250
  },
  "Still Stone": {
    "G002 White Crystal": 12000, "GTA023 Ice Crystal": 12000,
    "G2807 Black Crystal": 12500, "GTA1006 Cream Quartz": 12000,
    "GT8157 Carrara Extra": 12500, "GTA026 Milky White": 14750,
    "GT8155 Namibia White": 14750, "GT9690 Arabescato": 14750,
    "GT8077 Grapfite Vein": 14750, "GT8080 Morning Sky": 14750,
    "GT8183 Kalahari Sand": 14750, "GT9001 Milk&Honey": 14750,
    "GT9007 Chocolate Brownie": 14750, "GT9170 Santorini Rock": 14750,
    "GT6010 Ural White": 14750, "GT9680 Sahara Gold": 15750,
    "GT9830 Marquina Teide": 15750, "GT8627 Rhodesia Black": 15750,
    "GT9650 Arctica": 15750, "GT9750 Statuario": 15750,
    "GT1990 Calacatta Minore": 18500, "GT9980 Calacatta Maggiore": 18500,
    "GT7040 Calacatta Voski": 18500
  },
  Asterum: {
    "0001 Perfecta": 15500, "1001 Coliseum": 17750, "1101 Megapolis": 13000,
    "1104 Macedonia": 18750, "1105 Trufaldino": 18750, "3000 Jakarta": 15500,
    "3002 Cappucino": 18500, "3003 Cleopatra": 15500, "3004 Buckingham": 18500,
    "3101 Alaska": 14000, "3102 Palladium": 14500, "3103 Leonardo": 18000,
    "3104 Tundra": 15000, "3200 Arabica": 15500, "3402 Palladium Matt": 15750,
    "4002 Derbent": 17250, "4101 Safary": 22000, "4102 Husky": 18500,
    "4103 Niagara": 17750, "4104 Bionica": 17750, "5001 Albion": 19250,
    "5002 Caracum": 18000, "5003 Michelangelo": 18000, "5101 Everest": 19500,
    "5108 Vanessa": 20000, "5109 Picanto": 21500, "5110 Charaur": 19250,
    "5400 Himalayas Matt": 22000, "5401 Aurelia Matt": 20000,
    "6101 Archeolog": 18500, "6106 Bagira": 19250, "7401 Hippy Matt": 19500
  },
  Technistone: {
    "Brilliant Arabesco": 21250, "Crystal Absolute White": 25500,
    "Crystal Polar White": 22250, "Crystal Royal": 19250,
    "Gobi Black": 18000, "Gobi Grey": 18000,
    "Morning Daisy (мат)": 22250, "Noble Arco": 23750,
    "Noble Arco (мат)": 24500, "Noble Areti Bianco": 24500,
    "Noble Athos Brown": 19750, "Noble Botticino": 23250,
    "Noble Carrara": 23500, "Noble Concrete Grey": 18750,
    "Noble Concrete Grey (мат)": 19500, "Noble Imperial Grey": 23000,
    "Noble Ivory White": 19500, "Noble Linea": 24000,
    "Noble Olympos Mist": 24000, "Noble Pietra Grey": 19500,
    "Noble Portland Grey": 18750, "Noble Portland Grey (мат)": 19500,
    "Noble Pro Cloud": 20000, "Noble Pro Frost": 19750,
    "Noble Pro Storm": 21000, "Noble Quartzite": 23000,
    "Noble Quartzite (мат)": 23750, "Noble Supreme White": 24000,
    "Noble Troya": 19000, "Noble Vintage": 18750,
    "Noble Vintage (мат)": 19500, "Pearl Delta": 22000,
    "Taurus Black": 17500, "Taurus Terazzo Dark": 19250,
    "Taurus Terazzo Dark (мат)": 20000, "Taurus Terazzo Grey": 15750,
    "Taurus Terazzo White": 19500, "Wedding Lily (мат)": 23750,
    "Wild Yucca": 22500
  },
  Primax: {
    "100 Ivory White": 12500, "111 Snow White": 12750,
    "111 Snow White (Мат)": 15500, "112 Crystal White": 11250,
    "120 Light Grey (Мат)": 11000, "130 Beige Sand (Мат)": 15500,
    "150 Black Satin (Мат)": 23500, "312 Patagonia": 23500,
    "313 White Arctic (Мат)": 23500, "331 Panda White": 23500,
    "335 Tiffani Blue": 23500, "340 Taj Mahal": 23500,
    "345 Black Sea": 23500, "702 Light Calacatta": 19500,
    "703 Rich Calacatta": 15750, "704 Arabescata White": 23500,
    "706 Calacatta Grey (Мат)": 15750, "719 Earthquake (Мат)": 19500,
    "722 Calacatta Warm Venatto (Мат)": 19500, "723 Calacatta Gold": 19500,
    "726 Virtrum Crystal": 23500, "740 Rainbow Calacatta": 19500,
    "770 Sahara Noir": 19500, "786 Calacatta Back Gold": 23500,
    "796 Noir Satin (Мат)": 23500, "812 Black Rock (Мат)": 20500,
    "826 Concrete Grey (Мат)": 20500, "833 TerraCotta (Мат)": 20500,
    "848 White Oxid (Мат)": 20500, "884 Dark Concrete (Мат)": 20500,
    "892 Grey Oxid (Мат)": 20500, "912 White Carrara": 13500,
    "913 Golden Sunset": 15500, "915 Dark Mist": 13500,
    "916 Emperador": 13500, "920 White Marble": 13500,
    "931 Sunny Carrara": 13500, "942 Ivory Grey": 13500,
    "961 Ice Storm": 15500, "971 Ice Grey (Мат)": 11000
  },
  // Бренды, для которых цены подобраны из диапазона Primax
  "Etna Quartz": {
    "EQHM 001 Perlino Bianco": 15500, "EQHM 002 Calacatta Venato": 19500,
    "EQHM 003 Canvas": 15750, "EQHG 004 Canvas": 15750,
    "EQHG 004 Canvas (матовый)": 16250, "EQHM 005 Mandala": 15750,
    "EQHM 006 Negro Marquina": 17500, "EQHM 007 Grey Marquina": 17500,
    "EQHM 007 Grey Marquina (мат)": 18000, "EQPM 008 Calacatta Santorini": 19500,
    "EQT 017 Bianco Extra": 15500, "EQT 017 Bianco Extra (мат)": 16250,
    "EQTM 018 Calacatta Borghini": 19500, "EQPM 020 Sofita Beige": 15500,
    "EQPG 022 Bianco Antico": 15750, "EQPM 023 White Ice": 15500,
    "EQPM 025 Azul Imperiale": 15750, "EQPM 026 Brown Perlino": 15750,
    "EQPM 027 Ambra": 15750, "EQPM 028 Black Perlino": 17500,
    "EQHM 029 Sahara Noir": 19500, "EQAC 036 Antica Grey": 15500,
    "EQAM 042 Volakas Extra": 15750, "EQAM 043 Bianco Crystallo": 15500,
    "EQAM 046 Arabescato Corcia": 19500, "EQJC 052 Black Mirror": 17750,
    "EQJC 054 Antica Dark Bronze (Мат)": 18000, "EQCM 059 Canvas Gold": 15750,
    "EQCC 061 Antico Classic (Мат)": 16250, "EQC 067 Pure White": 15500,
    "EQPM 068 Panda White": 15500, "EQJO 069 Onyx Bianco": 15750,
    "EQMM 070 Calacatta Star": 19500, "EQMM 071 Golden Silk": 15750,
    "EQMM 072 Moon Valley": 15750, "EQJM 073 Calacatta Etna": 19500,
    "EQJQ 077 Patagonia Extra": 23500, "EQMO 079 Aquamarine": 15750,
    "EQAG 099 Titanium Leather (Мат)": 20500, "EQMM 101 Carrara": 15500,
    "EQMM 102 Cream Beige": 15500, "EQMO 103 Ice Onyx": 15750,
    "EQMM 104 Etna Delicato": 15750
  },
  Caesarstone: {
    "3141 Osprey": 15500, "3142 While Shimmer": 15500,
    "6141 Ocean Foam": 15750, "9141 Ice Snow": 15500,
    "1141 Pure White": 15500, "2040 Urban": 15750,
    "2141 Snow": 15500, "2230 Linen": 15500,
    "7110 Burnt Cordite": 17500, "4030 Oyster": 15500,
    "4120 Raven": 17500, "4600 Organic White": 15500,
    "3100 Jet Black": 17750, "4130 Clamshell": 15500,
    "4230 Shitake": 15500, "4350 Mink": 15500,
    "5000 London Grey": 15750, "5003 Piatra Grey": 15750,
    "5100 Vanilla Noir": 17750, "5110 Alpine Mist": 15750,
    "5133 Symphony Grey": 15750, "5141 Frosty Carina": 15750,
    "5143 White Attica": 15500, "5212 Taj Royale": 23500,
    "6003 Coastal Grey": 15750, "6046 Moorland Fog": 15750,
    "6131 Bianco Drift": 15750, "6134 Georgian Bluffs": 15750,
    "6313 Turbine Grey": 15750, "6338 Woodlands": 15750,
    "4003 Sleek Concrete (мат)": 16250, "4011 Cloudbust Concrete (мат)": 16250,
    "4023 Topus Concrete (мат)": 16250, "4033 Rugged Concrete (мат)": 16250,
    "4043 Primordia (мат)": 16250, "4044 Airy Concrete (мат)": 16250,
    "4735 Oxidian (мат)": 20500, "5810 Black Tempal (мат)": 17750,
    "5031 Statuario Maximus": 19500, "5111 Statuario Nuvo": 19500,
    "5131 Calacatta Nuvo": 19500
  },
  Belenco: {
    "1010 Premium White": 15500, "1010 Premium White Seta": 16250,
    "3110 Polaris": 15500, "3110 Polaris Seta": 16250,
    "3727 Just Black": 17750, "4110 Diamond White": 15500,
    "4262 Kristella White": 15500, "5050 Forza Fume": 15750,
    "5139 Juliet White": 15500, "5250 Elexir White": 15500,
    "5250 Elexir White Seta": 16250, "5751 Gala Black": 17750,
    "6139 Everst White": 15500, "8250 Columbia Gray": 15750,
    "8262 Mont Blanc Snow": 15500, "8765 Volcano Black": 17750,
    "8765 Volcano Black Seta": 18250, "9242 Arena": 15500,
    "9242 Arena Seta": 16250, "1110 Iceberg": 15500,
    "1123 Perla White": 15500, "1124 Amalfi": 15500,
    "1227 Pixie Wings": 15750, "2214 Teos": 15750,
    "2254 Aurora": 15750, "2543 Ashen": 15750,
    "2543 Ashen Seta": 16250, "2555 Artesia": 15750,
    "3113 Daphne Crack": 15750, "3333 Boletus": 15750,
    "3333 Boletus Seta": 16250, "3555 Parma": 15750,
    "3555 Parma Seta": 16250, "3618 Olympos": 15750,
    "4043 Aizano": 15750, "4043 Aizano Seta": 16250,
    "4123 Kashmera White": 15500, "4217 Rapture": 15750,
    "4227 Fairy White": 15500, "4444 Sahara Beige": 15500,
    "4456 Cadiz": 15750, "4458 Chakra Beige": 15500,
    "4524 La Luna": 15750, "4535 Terre Grey": 15750,
    "4558 Babilon": 15750, "4558 Babilon Seta": 16250,
    "5113 Minta": 15500, "5114 Carola": 15500,
    "5224 Elegance": 15750, "5329 Mocca Mousse": 15500,
    "6114 Belluno": 15500, "6114 Belluno Honed": 16250,
    "7123 Carrara Bela": 15500, "7227 Armilla": 15750,
    "7353 Pergamon": 15500, "7458 Granada": 15750,
    "7537 Metropol Grey": 15750, "7537 Metropol Grey Seta": 16250,
    "7543 Montana": 15750, "8113 Anemon": 15750,
    "8123 Carrara Luca": 15500, "8727 Spa Black": 17750,
    "8727 Spa Black Seta": 18250, "9113 Alinda": 15500,
    "1189 Calacatta Garda": 19500, "1219 Calacatta Victory": 19500,
    "1220 Calacatta Paletino": 19500, "1221 Calacatta Valencia": 19500,
    "2219 Calacatta Venezia": 19500, "2229 Calacatta Venus": 19500,
    "3516 Hypnose": 15750, "4120 Calacatta Alya": 19500,
    "4242 Statuario Volga": 19500, "5219 Statuario Crux": 19500,
    "6214 Stardust": 15750, "6229 Aspendos": 15750,
    "7119 Calacatta Venatino": 19500, "7220 Pantheon": 15750,
    "8119 Calacatta Verona": 19500, "9119 Calacatta Veneto": 19500,
    "9219 Marquina Tierra": 17750, "9219 Marquina Tierra Seta": 18250,
    "9719 Marquina Lavanga": 17750
  },
  Vicostone: {
    "BQ 5260 Beton (5мм) (Мат)": 17000, "BQ 5261 Materica (5мм) (Мат)": 17000,
    "BQ 5290 Nube (5мм) (Мат)": 17000, "BQ 5291 Rusty (5мм) (Мат)": 17000,
    "BQ 5860 Corazon (5мм) (Мат)": 17000, "BQ 5862 Oceanid (5мм) (Мат)": 17000,
    "BS 124 Satined": 15500, "BQ 2101 Pure Black": 17750,
    "BQ 8220 Carrara": 15500, "BQ 8590 Dolce Vita": 15750,
    "BQ 8815 Misterio": 15750, "BQ 8740 Nero Marquina": 17750,
    "BQ 2605 Denali (Мат)": 16250, "BQ 3603 Galilea (Мат)": 16250,
    "BQ 6800 Grey Monet (Мат)": 16250, "BQ 8730 Cemento (Мат)": 16250,
    "BQ 8860 Concreto (Мат)": 16250, "BQ 8863 Tartufo (Мат)": 16250,
    "BQ 8864 Naxos (Мат)": 16250, "BQ 8870 Olympus White (Мат)": 16250,
    "BQ 8891 Madreperola (Мат)": 16250, "BQ 8926 Calacatta Caldia (Мат)": 19500,
    "BQ 200 Artic Snow": 15500, "BQ 2600 Valley White": 15500,
    "BQ 2607 Serizzo Monterosa": 15750, "BQ 100 Quasar Light": 15500,
    "BQ 7702 Moonglade": 15750, "BQ 8402 Delta": 15750,
    "BQ 8430 Botticino Classic": 15750, "BQ 8440 Bianco Venato": 15750,
    "BQ 8560 Dark Emperador": 17750, "BQ 8614 Altissimo": 15750,
    "BQ 8668 Ice Lake": 15500, "BQ 8786 Thunder Blue": 15750,
    "BQ 8812 Java Noir": 17750, "BQ 8820 Misterio Gold": 15750,
    "BQ 9310 Silver Sea": 15750, "BQ 9453 Taj Mahal": 23500,
    "BQ 9470 Azul Aran": 15750, "BQ 6700 Covelani": 15750,
    "BQ 6701 Camarina": 15750, "BQ 6702 Costa Nova": 15750,
    "BQ 8583 Akoya": 15750, "BQ 8628 Statuario": 19500,
    "BQ 8660 Venatino": 15750, "BQ 8738 Greylac": 15750,
    "BQ 8780 Argento": 15750, "BQ 8788 Diamante": 15750,
    "BQ 8800 Bettoglio": 15750, "BQ 8881 Gan Eden": 15750,
    "BQ 8887 Amadeus": 15750, "BQ 8918 Vivalioro": 15750,
    "BQ 8920 Forza": 15750, "BQ 9700 Sahara Noir": 19500
  },
  "Quantra Quartz": {
    "2442 Semolina": 15500, "2456 Brown Leaf": 15500,
    "1673 New Carrara": 15500, "2455 Ancient Beige": 15500,
    "6589 Classic Ivory": 15500, "7172 Arctic Breeze": 15500,
    "2430 Artisan Wool": 15500, "7111 Agnolo Matt": 16250,
    "7447 Bianco Venatino": 15750, "7448 Bellini Matt": 16250,
    "7500 Masaccio": 15750, "7511 Botticelli": 15750,
    "7522 Raphael": 15750, "7700 Antonio": 15750,
    "7982 Rogier": 15750, "9334 Calacatta Capri": 19500,
    "9333 Calacatta Oro": 19500, "9010 Calacatta Luca": 19500,
    "9444 Calacatta Borghini": 19500, "8058 Hermes Grey Matt": 16250,
    "9510 Cygnus Divine": 15750, "9965 Golden Gate": 15750,
    "9953 Sevilia": 15750, "9976 Pirouette": 15750,
    "9996 Leonardo": 15750, "9972 San Marco": 15750,
    "9987 Champs-Elysees": 15750, "9986 Fontainebleau": 15750,
    "9960 Pantheon": 15750, "9962 La Dolce Vita": 15750,
    "2048 Snow White": 15500
  },
  "Aleph Stone": {
    "A35 Bianco Marble": 15500, "A30 Ultra White": 15500,
    "A33 Carrara Ideal": 15500, "A63 Artico": 15750,
    "A69 Artico Perlato (Мат)": 16250, "A70 Arabescato White": 19500,
    "A80 Statuario NG": 19500, "A82 Golden Age": 15750,
    "A60 Calacatta Spring": 19500, "A62 Calacatta Lincoln": 19500,
    "A66 Storm Grey (Мат)": 16250, "A78 Arabescato Notte": 19500,
    "A87 Ariston": 15750, "A75 Arabescato Delicato": 19500,
    "A76 Arabescato Miele": 19500, "A77 Arabescato Nature": 19500,
    "A79 Arabescato Irish": 19500, "A91 Travertino": 15750,
    "A93 Taj Mahal": 23500, "A95 Desert Rose": 15750,
    "A96 Ivory Glace": 15500, "A97 Onice Ambra": 15750,
    "A90 Solomeo (Мат)": 16250, "A88 Calacatta Luxe": 19500,
    "A89 Emperador": 15750, "A92 Onyx Blue": 15750,
    "A94 Onyx Bianco": 15500, "A99 Ocean Grey": 15750,
    "A100 Clear Quartz": 15500
  }
};

const CATALOG_BRAND_ORDER = [
  "Avant Quartz", "Avarus", "Smart Quartz", "Noblle Quartz",
  "Etna Quartz", "Caesarstone", "Technistone", "Still Stone",
  "Belenco", "Asterum", "Radianz", "Vicostone",
  "Quantra Quartz", "Aleph Stone", "Primax"
] as const;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\(мат\)/gi, "mat")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function manufacturerSlug(manufacturer: string): string {
  return slugify(manufacturer.replace(/quartz/gi, "").trim());
}

function inferFinish(title: string): string {
  return /(мат|mat|матовый|honed|seta)/i.test(title) ? "Матовая" : "Полированная";
}

function inferColor(title: string): string {
  const source = title.toLowerCase();
  if (/(black|nero|noir|темн|черн)/i.test(source)) return "Черный";
  if (/(white|bianco|blanc|snow|ice|polar|снег|бел)/i.test(source)) return "Белый";
  if (/(grey|gray|grigio|gris|бетон|concrete|silver)/i.test(source)) return "Серый";
  if (/(beige|ivory|sand|taj|cream|gold|aurelia|terracotta)/i.test(source)) return "Бежевый";
  if (/(brown|mocca|coffee|emperador|chocolate)/i.test(source)) return "Коричневый";
  if (/(blue|azul|ocean|aquamarine)/i.test(source)) return "Синий";
  return "Микс";
}

function inferTexture(title: string): string {
  const source = title.toLowerCase();
  if (/(calacatta|statuario|carrara|arabesc|marquina|patagonia|onyx|taj|travertin|venato)/i.test(source)) {
    return "Мраморная";
  }
  if (/(concrete|beton|urban|cemento|oxid|materica|rusty)/i.test(source)) {
    return "Бетонная";
  }
  return "Каменная";
}

function inferThicknesses(title: string): string[] {
  if (/\b5 ?мм|\(5мм\)/i.test(title)) return ["5 мм"];
  if (/\b8 ?мм/i.test(title)) return ["8 мм", "20 мм"];
  return ["20 мм", "30 мм"];
}

function toStoneImage(manufacturer: string, title: string): string {
  const folder = IMAGE_FOLDER_MAP[manufacturer];
  return folder ? `/images/${folder}/${title}.webp` : "/images/quartz-surface-light.svg";
}

function catalogTitlesForManufacturer(manufacturer: string): string[] {
  return Object.keys(STONE_PRICES_BY_BRAND[manufacturer] ?? {});
}

function buildCatalogRows(groups: TitleListGroup[]): QuartzCatalogRow[] {
  const rows: QuartzCatalogRow[] = [];
  for (const g of groups) {
    g.items.forEach((title, index) => {
      rows.push({
        manufacturer: g.manufacturer,
        title,
        price: STONE_PRICES_BY_BRAND[g.manufacturer]?.[title] ?? 0,
        featured: index < 4
      });
    });
  }
  return rows;
}

function catalogRowToSample(row: QuartzCatalogRow, ord: Map<string, number>): StoneSample {
  const mfrSlug = manufacturerSlug(row.manufacturer);
  const next = (ord.get(row.manufacturer) ?? 0) + 1;
  ord.set(row.manufacturer, next);
  const id = `stone_${mfrSlug}_${next}`;
  const slug = `${mfrSlug}-${slugify(row.title)}`;
  return {
    id,
    slug,
    title: row.title,
    stoneType: "quartz",
    manufacturer: row.manufacturer,
    color: inferColor(row.title),
    texture: inferTexture(row.title),
    thicknesses: inferThicknesses(row.title),
    finish: inferFinish(row.title),
    description: STONE_DESCRIPTION(row.manufacturer),
    image: toStoneImage(row.manufacturer, row.title),
    isFeatured: row.featured ?? false,
    priceFrom: row.price > 0 ? row.price : null
  };
}

const catalogTitleGroups: TitleListGroup[] = CATALOG_BRAND_ORDER.map((manufacturer) => ({
  manufacturer,
  items: catalogTitlesForManufacturer(manufacturer)
}));

const catalogOrdinalByBrand = new Map<string, number>();
export const quartzBrandStones: StoneSample[] = buildCatalogRows(catalogTitleGroups).map((row) =>
  catalogRowToSample(row, catalogOrdinalByBrand)
);