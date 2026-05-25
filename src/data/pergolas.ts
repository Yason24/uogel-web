import type { Product, ProfileColor } from "@/types";

const sharedColors: ProfileColor[] = [
  { id: "white", ral: "RAL 9016", name: "Матовый белый" },
  { id: "grey",  ral: "RAL 7016", name: "Антрацит матовый", swatch: "/images/colors/ral-7016.png" },
  { id: "black", ral: "RAL 9005", name: "Матовый чёрный",   swatch: "/images/colors/ral-9005.png" },
  { id: "brown", ral: "RAL 8040", name: "Тёмно-коричневый", swatch: "/images/colors/ral-8040.png" },
];

export const products: Product[] = [
  {
    id: "a13",
    slug: "a13",
    seriesName: "A13",
    title: "UOGEL A13",
    subtitle: "Флагманская биоклиматическая система",
    description:
      "A13 — старший биоклиматический профиль UOGEL. Крупный профиль 150×150 мм, широкие ламели 250×45 мм, встроенная RGB LED-подсветка и полностью моторизованный привод. Размеры подбираются под проект из реальной сетки конфигураций UOGEL.",
    category: "bioclimatic",
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
      blade: "250×45 мм, поворотные",
      material: "Алюминий",
      waterDrainage: true,
    },
    baseEquipment: [
      "Алюминиевый профиль 150×150 мм",
      "Поворотные ламели 250×45 мм",
      "LED RGB 7-цветная подсветка",
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
    profileColors: sharedColors,
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
        "Флагманская биоклиматическая система UOGEL A13: профиль 150×150 мм, ламели 250×45 мм, RGB LED, моторизованный привод. Расчёт поставки в Россию.",
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
      "C10 — ламельная система на крупном профиле 150×150 мм с ламелями 195×40 мм. Моторизованный привод, RGB/Dual LED и широкая совместимость с боковыми опциями делают её универсальным решением для просторных террас и коммерческих объектов.",
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
      blade: "195×40 мм, поворотные",
      material: "Алюминий",
      waterDrainage: true,
    },
    baseEquipment: [
      "Алюминиевый профиль 150×150 мм",
      "Поворотные ламели 195×40 мм",
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
    profileColors: sharedColors,
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
        "UOGEL C10: ламельная система на профиле 150×150 мм с моторизованным приводом, RGB/Dual LED. Расчёт поставки в Россию.",
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
      "C7 — гибкая ламельная система на профиле 120×120 мм. Подходит как для пристенного монтажа, так и для отдельностоящей установки. Моторизованный привод, ламели 195×40 мм, широкий диапазон конфигураций.",
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
      post: "120×120 мм",
      blade: "195×40 мм, поворотные",
      material: "Алюминий",
      waterDrainage: true,
    },
    baseEquipment: [
      "Алюминиевый профиль 120×120 мм",
      "Поворотные ламели 195×40 мм",
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
    profileColors: sharedColors,
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
        "UOGEL C7: ламельная система на профиле 120×120 мм, пристенная и отдельностоящая установка, ламели 195×40 мм, моторизованный привод. Поставка в Россию.",
      ogImage: "/images/products/c7.jpg",
    },
  },
  {
    id: "c4",
    slug: "c4",
    seriesName: "C4",
    title: "UOGEL C4",
    subtitle: "Моторизованная система среднего класса",
    description:
      "C4 — моторизованная ламельная система на профиле 120×120 мм с ламелями 140×35 мм. Оптимальное соотношение возможностей и стоимости для частных террас и небольших коммерческих объектов.",
    category: "louvered",
    drive: "motorized",
    systemType: "freestanding",
    status: "available",
    sizeRange: {
      minWidth: 3000,
      maxWidth: 6000,
      minDepth: 2000,
      maxDepth: 5000,
      customizable: true,
    },
    specs: {
      post: "120×120 мм",
      blade: "140×35 мм, поворотные",
      material: "Алюминий",
      waterDrainage: true,
    },
    baseEquipment: [
      "Алюминиевый профиль 120×120 мм",
      "Поворотные ламели 140×35 мм",
      "LED подсветка",
      "Моторизованный привод",
      "Интегрированный водоотвод",
    ],
    compatibleOptions: [
      "zip-screen",
      "frameless-glass",
      "narrow-frame-glass",
      "aluminium-shutters",
      "rain-wind-sensors",
    ],
    profileColors: sharedColors,
    useCases: ["Частный дом", "Терраса у коттеджа", "Патио", "Небольшое кафе"],
    images: [
      "/images/products/c4.jpg",
    ],
    seo: {
      title: "Пергола UOGEL C4 — моторизованная ламельная система",
      description:
        "UOGEL C4: профиль 120×120 мм, ламели 140×35 мм, моторизованный привод. Доступное решение для частных и небольших коммерческих объектов. Поставка в Россию.",
      ogImage: "/images/products/c4.jpg",
    },
  },
  {
    id: "m4",
    slug: "m4",
    seriesName: "M4",
    title: "UOGEL M4",
    subtitle: "Ручная ламельная система",
    description:
      "M4 — ручная версия ламельной системы на профиле 120×120 мм. Управление ламелями 140×35 мм производится вручную. Надёжное и экономичное решение без автоматики.",
    category: "louvered",
    drive: "manual",
    systemType: "freestanding",
    status: "available",
    sizeRange: {
      minWidth: 3000,
      maxWidth: 5000,
      minDepth: 2000,
      maxDepth: 4000,
      customizable: true,
    },
    specs: {
      post: "120×120 мм",
      blade: "140×35 мм, поворотные",
      material: "Алюминий",
      waterDrainage: true,
    },
    baseEquipment: [
      "Алюминиевый профиль 120×120 мм",
      "Поворотные ламели 140×35 мм",
      "LED подсветка",
      "Ручное управление",
      "Интегрированный водоотвод",
    ],
    compatibleOptions: ["zip-screen", "frameless-glass", "narrow-frame-glass", "aluminium-shutters"],
    profileColors: sharedColors,
    useCases: ["Частный дом", "Дача", "Небольшая терраса", "Зона отдыха"],
    images: [
      "/images/products/m4.jpg",
    ],
    seo: {
      title: "Пергола UOGEL M4 — ручная ламельная система",
      description:
        "UOGEL M4: ламельная система на профиле 120×120 мм с ручным управлением. Надёжное и экономичное решение для частных объектов. Поставка в Россию.",
      ogImage: "/images/products/m4.jpg",
    },
  },
  {
    id: "m3",
    slug: "m3",
    seriesName: "M3",
    title: "UOGEL M3",
    subtitle: "Компактная ручная система в стандартных размерах",
    description:
      "M3 — компактная ламельная система для небольших террас. Выпускается в двух стандартных конфигурациях: 3×2 м и 3×3 м. Ручное управление, простой монтаж, минимальный порог входа.",
    category: "louvered",
    drive: "manual",
    systemType: "freestanding",
    status: "available",
    sizeRange: {
      minWidth: 3000,
      maxWidth: 3000,
      minDepth: 2000,
      maxDepth: 3000,
      customizable: false,
      standardSizes: [
        { width: 3000, depth: 2000 },
        { width: 3000, depth: 3000 },
      ],
    },
    specs: {
      post: "100×100 мм",
      blade: "140×35 мм, поворотные",
      material: "Алюминий",
      waterDrainage: true,
    },
    baseEquipment: [
      "Алюминиевый профиль 100×100 мм",
      "Поворотные ламели 140×35 мм",
      "LED подсветка",
      "Ручное управление",
      "Интегрированный водоотвод",
    ],
    compatibleOptions: ["zip-screen"],
    profileColors: sharedColors,
    useCases: ["Небольшая терраса", "Дача", "Зона у бассейна", "Балкон"],
    images: [
      "/images/products/m3.jpg",
    ],
    seo: {
      title: "Пергола UOGEL M3 — компактная система 3×2, 3×3 м",
      description:
        "UOGEL M3: компактная ламельная система в стандартных размерах 3×2 и 3×3 м. Ручное управление, доступная цена, поставка в Россию.",
      ogImage: "/images/products/m3.jpg",
    },
  },
];

// Backward compatibility — used by src/app/api/lead/route.ts
export const pergolas = products;
export const availablePergolas = products.filter((p) => p.status === "available");
export const getPergolaBySlug = (slug: string) => products.find((p) => p.slug === slug);
