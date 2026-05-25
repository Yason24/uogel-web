import type { Product, ProfileColor } from "@/types";

// Premium series: A13, C10, C7 — RAL9016 / RAL7016 / RAL9005 / RAL8040
const premiumColors: ProfileColor[] = [
  { id: "white", ral: "RAL 9016", name: "Матовый белый" },
  { id: "grey",  ral: "RAL 7016", name: "Антрацит матовый", swatch: "/images/colors/ral-7016.png" },
  { id: "black", ral: "RAL 9005", name: "Матовый чёрный",   swatch: "/images/colors/ral-9005.png" },
  { id: "brown", ral: "RAL 8040", name: "Тёмно-коричневый", swatch: "/images/colors/ral-8040.png" },
];

// Standard series: C4, M4, M3, M2-S — RAL9016 / RAL7016 / RAL9005 / Custom Colors
const standardColors: ProfileColor[] = [
  { id: "white", ral: "RAL 9016", name: "Матовый белый" },
  { id: "grey",  ral: "RAL 7016", name: "Антрацит матовый", swatch: "/images/colors/ral-7016.png" },
  { id: "black", ral: "RAL 9005", name: "Матовый чёрный",   swatch: "/images/colors/ral-9005.png" },
  { id: "custom", ral: "Custom Colors", name: "Индивидуальный цвет" },
];

export const products: Product[] = [
  {
    id: "a13",
    slug: "a13",
    seriesName: "A13",
    title: "UOGEL A13",
    subtitle: "Флагманская биоклиматическая система",
    description:
      "A13 — старший биоклиматический профиль UOGEL. Профиль стойки 150×150 мм, балка 210×150 мм, ламели 202×45 мм с RGB LED-подсветкой и полностью моторизованным приводом. Размеры подбираются под проект из реальной сетки конфигураций UOGEL.",
    category: "bioclimatic",
    drive: "motorized",
    systemType: "freestanding",
    status: "available",
    sizeRange: {
      minWidth: 3000,
      maxWidth: 6000,
      minDepth: 2000,
      maxDepth: 6000,
      customizable: true,
    },
    specs: {
      post: "150×150 мм",
      blade: "202×45 мм, поворотные",
      beam: "210×150 мм",
      material: "Алюминий",
      waterDrainage: true,
      led: "RGB 7 цветов",
    },
    baseEquipment: [
      "Алюминиевый профиль стойки 150×150 мм",
      "Балка 210×150 мм",
      "Поворотные ламели 202×45 мм",
      "RGB LED-подсветка (7 цветов)",
      "Моторизованный привод",
      "Интегрированный водоотвод через стойки",
    ],
    compatibleOptions: [
      "zip-screen",
      "frameless-glass",
      "narrow-frame-glass",
      "aluminium-shutters",
      "ceiling-fan",
      "electrical-heater",
      "rain-wind-sensors",
    ],
    profileColors: premiumColors,
    useCases: [
      "Частный дом и резиденция",
      "Загородный отель",
      "Ресторан с открытой верандой",
      "Представительский коммерческий объект",
    ],
    images: [
      "/images/products/a13.jpg",
    ],
    seo: {
      title: "Пергола UOGEL A13 — биоклиматическая система в Россию",
      description:
        "Флагманская биоклиматическая система UOGEL A13: профиль 150×150 мм, ламели 202×45 мм, RGB LED, моторизованный привод. Расчёт поставки в Россию.",
      ogImage: "/images/products/a13.jpg",
    },
  },
  {
    id: "c10",
    slug: "c10",
    seriesName: "C10",
    title: "UOGEL C10",
    subtitle: "Ламельная моторизованная система",
    description:
      "C10 — ламельная система на профиле 150×150 мм с ламелями 193×40 мм. Балка 220×123 мм, моторизованный привод, RGB/Dual LED. Широкая совместимость с боковыми опциями делает её универсальным решением для просторных террас и коммерческих объектов.",
    category: "louvered",
    drive: "motorized",
    systemType: "freestanding",
    status: "available",
    sizeRange: {
      minWidth: 3000,
      maxWidth: 8000,
      minDepth: 2000,
      maxDepth: 6000,
      customizable: true,
    },
    specs: {
      post: "150×150 мм",
      blade: "193×40 мм, поворотные",
      beam: "220×123 мм",
      material: "Алюминий",
      waterDrainage: true,
      led: "RGB / Dual LED",
    },
    baseEquipment: [
      "Алюминиевый профиль стойки 150×150 мм",
      "Балка 220×123 мм",
      "Поворотные ламели 193×40 мм",
      "RGB / Dual LED подсветка",
      "Моторизованный привод",
      "Интегрированный водоотвод",
    ],
    compatibleOptions: [
      "zip-screen",
      "frameless-glass",
      "narrow-frame-glass",
      "aluminium-shutters",
      "ceiling-fan",
      "electrical-heater",
      "rain-wind-sensors",
    ],
    profileColors: premiumColors,
    useCases: [
      "Ресторан и кафе",
      "Загородный отель",
      "Просторная терраса",
      "Коммерческая зона отдыха",
    ],
    images: [
      "/images/products/c10.jpg",
    ],
    seo: {
      title: "Пергола UOGEL C10 — ламельная моторизованная система",
      description:
        "UOGEL C10: ламельная система на профиле 150×150 мм с моторизованным приводом, RGB/Dual LED, балка 220×123 мм. Расчёт поставки в Россию.",
      ogImage: "/images/products/c10.jpg",
    },
  },
  {
    id: "c7",
    slug: "c7",
    seriesName: "C7",
    title: "UOGEL C7",
    subtitle: "Универсальная пристенная и отдельностоящая система",
    description:
      "C7 — гибкая ламельная система на профиле 150×150 мм. Подходит как для пристенного монтажа, так и для отдельностоящей установки. Ламели 193×40 мм, балка 220×123 мм, моторизованный привод, широкий диапазон конфигураций.",
    category: "louvered",
    drive: "motorized",
    systemType: "both",
    status: "available",
    sizeRange: {
      minWidth: 3000,
      maxWidth: 7000,
      minDepth: 2000,
      maxDepth: 5500,
      customizable: true,
    },
    specs: {
      post: "150×150 мм",
      blade: "193×40 мм, поворотные",
      beam: "220×123 мм",
      material: "Алюминий",
      waterDrainage: true,
      led: "LED",
    },
    baseEquipment: [
      "Алюминиевый профиль стойки 150×150 мм",
      "Балка 220×123 мм",
      "Поворотные ламели 193×40 мм",
      "LED подсветка",
      "Моторизованный привод",
      "Интегрированный водоотвод",
    ],
    compatibleOptions: [
      "zip-screen",
      "frameless-glass",
      "narrow-frame-glass",
      "aluminium-shutters",
      "ceiling-fan",
      "electrical-heater",
      "rain-wind-sensors",
    ],
    profileColors: premiumColors,
    useCases: [
      "Терраса у дома",
      "Пристенное решение к фасаду",
      "Кафе и ресторан",
      "Коммерческий объект",
    ],
    images: [
      "/images/products/c7.jpg",
    ],
    seo: {
      title: "Пергола UOGEL C7 — пристенная и отдельностоящая система",
      description:
        "UOGEL C7: ламельная система на профиле 150×150 мм, пристенная и отдельностоящая установка, ламели 193×40 мм, моторизованный привод. Поставка в Россию.",
      ogImage: "/images/products/c7.jpg",
    },
  },
  {
    id: "c4",
    slug: "c4",
    seriesName: "C4/C4-S/M4/M4-S",
    title: "UOGEL C4 / M4",
    subtitle: "Моторизованная и ручная системы среднего класса",
    description:
      "C4/C4-S/M4/M4-S — группа ламельных систем на профиле 120×120 мм с ламелями 160×33 мм. C4 и C4-S оснащены моторизованным приводом, M4 и M4-S управляются вручную. Выпускаются в стандартных конфигурациях. Оптимальное соотношение возможностей и стоимости для частных террас и небольших коммерческих объектов.",
    category: "louvered",
    drive: "both",
    systemType: "freestanding",
    status: "available",
    sizeRange: {
      minWidth: 3000,
      maxWidth: 6000,
      minDepth: 3000,
      maxDepth: 4000,
      customizable: false,
      standardSizes: [
        { width: 3000, depth: 3000 },
        { width: 3000, depth: 4000 },
        { width: 4000, depth: 4000 },
        { width: 6000, depth: 3000 },
        { width: 6000, depth: 4000 },
      ],
    },
    specs: {
      post: "120×120 мм",
      blade: "160×33 мм, поворотные",
      material: "Алюминий",
      waterDrainage: true,
      led: "LED",
    },
    baseEquipment: [
      "Алюминиевый профиль 120×120 мм",
      "Поворотные ламели 160×33 мм",
      "LED подсветка",
      "Моторизованный или ручной привод (по серии)",
      "Интегрированный водоотвод",
    ],
    compatibleOptions: [
      "zip-screen",
      "frameless-glass",
      "narrow-frame-glass",
      "aluminium-shutters",
      "rain-wind-sensors",
    ],
    profileColors: standardColors,
    useCases: ["Частный дом", "Терраса у коттеджа", "Патио", "Небольшое кафе"],
    images: [
      "/images/products/c4.jpg",
    ],
    seo: {
      title: "Пергола UOGEL C4 / M4 — ламельные системы среднего класса",
      description:
        "UOGEL C4/C4-S/M4/M4-S: профиль 120×120 мм, ламели 160×33 мм. Моторизованный (C4) и ручной (M4) привод. Стандартные конфигурации. Поставка в Россию.",
      ogImage: "/images/products/c4.jpg",
    },
  },
  {
    id: "m3",
    slug: "m3",
    seriesName: "M3/M3-S",
    title: "UOGEL M3",
    subtitle: "Компактная ручная система в стандартных размерах",
    description:
      "M3/M3-S — компактная ламельная система на профиле 120×120 мм для небольших террас. Выпускается в трёх стандартных конфигурациях: 3×3, 3×4 и 3×6 м. Ручное управление, простой монтаж.",
    category: "louvered",
    drive: "manual",
    systemType: "freestanding",
    status: "available",
    sizeRange: {
      minWidth: 3000,
      maxWidth: 3000,
      minDepth: 3000,
      maxDepth: 6000,
      customizable: false,
      standardSizes: [
        { width: 3000, depth: 3000 },
        { width: 3000, depth: 4000 },
        { width: 3000, depth: 6000 },
      ],
    },
    specs: {
      post: "120×120 мм",
      blade: "160×33 мм, поворотные",
      material: "Алюминий",
      waterDrainage: true,
      led: "LED",
    },
    baseEquipment: [
      "Алюминиевый профиль 120×120 мм",
      "Поворотные ламели 160×33 мм",
      "LED подсветка",
      "Ручное управление",
      "Интегрированный водоотвод",
    ],
    compatibleOptions: ["zip-screen"],
    profileColors: standardColors,
    useCases: ["Небольшая терраса", "Дача", "Зона у бассейна", "Балкон"],
    images: [
      "/images/products/m3.jpg",
    ],
    seo: {
      title: "Пергола UOGEL M3/M3-S — компактная система 3×3, 3×4, 3×6 м",
      description:
        "UOGEL M3/M3-S: компактная ламельная система в стандартных размерах 3×3, 3×4 и 3×6 м. Ручное управление, доступная цена, поставка в Россию.",
      ogImage: "/images/products/m3.jpg",
    },
  },
  {
    id: "m2-s",
    slug: "m2-s",
    seriesName: "M2-S",
    title: "UOGEL M2-S",
    subtitle: "Начальная компактная серия в стандартных размерах",
    description:
      "M2-S — начальная компактная ламельная система на профиле 100×100 мм с ламелями 164×30 мм. Выпускается в трёх стандартных конфигурациях: 3×3, 3×4 и 3×6 м. Ручное управление, минимальный порог входа.",
    category: "louvered",
    drive: "manual",
    systemType: "freestanding",
    status: "available",
    sizeRange: {
      minWidth: 3000,
      maxWidth: 3000,
      minDepth: 3000,
      maxDepth: 6000,
      customizable: false,
      standardSizes: [
        { width: 3000, depth: 3000 },
        { width: 3000, depth: 4000 },
        { width: 3000, depth: 6000 },
      ],
    },
    specs: {
      post: "100×100 мм",
      blade: "164×30 мм, поворотные",
      material: "Алюминий",
      waterDrainage: true,
      led: "LED",
    },
    baseEquipment: [
      "Алюминиевый профиль 100×100 мм",
      "Поворотные ламели 164×30 мм",
      "LED подсветка",
      "Ручное управление",
      "Интегрированный водоотвод",
    ],
    compatibleOptions: ["zip-screen"],
    profileColors: standardColors,
    useCases: ["Небольшая терраса", "Дача", "Балкон", "Зона отдыха"],
    images: [
      "/images/products/m2-s.jpg",
    ],
    seo: {
      title: "Пергола UOGEL M2-S — компактная начальная серия",
      description:
        "UOGEL M2-S: начальная ламельная серия на профиле 100×100 мм в стандартных размерах 3×3, 3×4 и 3×6 м. Ручное управление, поставка в Россию.",
      ogImage: "/images/products/m2-s.jpg",
    },
  },
];

// Backward compatibility — used by src/app/api/lead/route.ts
export const pergolas = products;
export const availablePergolas = products.filter((p) => p.status === "available");
export const getPergolaBySlug = (slug: string) => products.find((p) => p.slug === slug);
