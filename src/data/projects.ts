export type ProjectCategory =
  | "private"
  | "restaurant"
  | "hotel"
  | "rooftop"
  | "pool";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  private: "Частные террасы",
  restaurant: "Рестораны и летние веранды",
  hotel: "Отели и resort-зоны",
  rooftop: "Rooftop-пространства",
  pool: "Зоны у бассейна",
};

export const CATEGORY_ORDER: ProjectCategory[] = [
  "private",
  "restaurant",
  "hotel",
  "rooftop",
  "pool",
];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  type: string;
  series: string;
  seriesSlug: string;
  optionLabels: string[];
  description: string;
  specs: string;
  images: string[];
  location?: string;
  isConceptReference: boolean;
};

export const projects: Project[] = [
  {
    slug: "private-terrace-coast",
    title: "Терраса загородной резиденции",
    category: "private",
    type: "Частная терраса",
    series: "A13",
    seriesSlug: "a13",
    optionLabels: ["ZIP-экраны", "RGB LED", "Датчики ветра и дождя"],
    description:
      "Конфигурация серии A13 для открытой террасы загородного дома. Отдельностоящая система с поворотными ламелями, интегрированным водоотводом и боковыми ZIP-экранами.",
    specs: "6×4 м · моторизованная · отдельностоящая",
    images: [
      "/images/gallery/a13-install-coast.jpg",
      "/images/gallery/gallery-3x3-terrace.jpg",
    ],
    isConceptReference: true,
  },
  {
    slug: "evening-terrace",
    title: "Вечерняя терраса с RGB-подсветкой",
    category: "private",
    type: "Частная терраса",
    series: "A13",
    seriesSlug: "a13",
    optionLabels: ["RGB LED", "Потолочный вентилятор", "Обогреватель"],
    description:
      "Конфигурация серии A13 с RGB-подсветкой ламелей и климатическим оборудованием. Система позволяет использовать террасу в вечернее время и в прохладный сезон.",
    specs: "5×4 м · моторизованная · отдельностоящая",
    images: [
      "/images/gallery/a13-install-evening.jpg",
      "/images/gallery/gallery-3x4-patio.jpg",
    ],
    isConceptReference: true,
  },
  {
    slug: "garden-patio",
    title: "Садовое патио",
    category: "private",
    type: "Патио",
    series: "M3",
    seriesSlug: "m3",
    optionLabels: ["ZIP-экраны"],
    description:
      "Компактная конфигурация серии M3 для небольшого садового патио. Стандартные размеры, ручное управление — лаконичное решение для частного дома.",
    specs: "3×4 м · ручное управление · стандартная конфигурация",
    images: ["/images/gallery/install-eu-garden.jpg"],
    isConceptReference: true,
  },
  {
    slug: "restaurant-summer-terrace",
    title: "Летняя веранда ресторана",
    category: "restaurant",
    type: "Ресторан",
    series: "C10",
    seriesSlug: "c10",
    optionLabels: ["ZIP-экраны", "Обогреватель", "Датчики ветра и дождя"],
    description:
      "Конфигурация серии C10 для крытой летней террасы ресторана. ZIP-экраны и обогреватели продлевают сезон, датчики погоды обеспечивают автоматическую защиту системы.",
    specs: "8×4 м · моторизованная · отдельностоящая",
    images: ["/images/gallery/gallery-4x6-restaurant.webp"],
    isConceptReference: true,
  },
  {
    slug: "cafe-patio-c7",
    title: "Открытое пространство кафе",
    category: "restaurant",
    type: "Кафе",
    series: "C7",
    seriesSlug: "c7",
    optionLabels: ["ZIP-экраны", "Потолочный вентилятор"],
    description:
      "Конфигурация серии C7 для пристенной зоны кафе. ZIP-экраны защищают от ветра, потолочный вентилятор создаёт комфорт в жаркий сезон.",
    specs: "4×4 м · моторизованная · пристенная",
    images: ["/images/gallery/gallery-4x4-cafe.jpg"],
    isConceptReference: true,
  },
  {
    slug: "hotel-lounge",
    title: "Лаундж-терраса отеля",
    category: "hotel",
    type: "Отель",
    series: "C10",
    seriesSlug: "c10",
    optionLabels: ["Безрамные стеклянные двери", "RGB LED", "Потолочный вентилятор"],
    description:
      "Конфигурация серии C10 для всесезонной лаундж-зоны отеля. Безрамное остекление закрывает периметр, сохраняя ощущение открытого пространства.",
    specs: "6×5 м · моторизованная · отдельностоящая",
    images: ["/images/gallery/install-eu-led.jpg"],
    isConceptReference: true,
  },
  {
    slug: "rooftop-terrace",
    title: "Rooftop-терраса с ZIP-системой",
    category: "rooftop",
    type: "Rooftop",
    series: "C7",
    seriesSlug: "c7",
    optionLabels: ["ZIP-экраны", "Датчики ветра и дождя"],
    description:
      "Конфигурация серии C7 для кровельной террасы. ZIP-экраны обеспечивают боковую защиту от ветра, датчики погоды автоматически реагируют на усиление ветровой нагрузки.",
    specs: "5×5 м · моторизованная · отдельностоящая",
    images: ["/images/gallery/c7-install-zip.jpg"],
    isConceptReference: true,
  },
  {
    slug: "pool-zone",
    title: "Зона отдыха у бассейна",
    category: "pool",
    type: "Зона у бассейна",
    series: "A13",
    seriesSlug: "a13",
    optionLabels: ["ZIP-экраны", "Потолочный вентилятор"],
    description:
      "Конфигурация серии A13 для лаундж-зоны у бассейна. Алюминий устойчив к влажной среде и УФ-излучению. Отдельностоящая система без привязки к фасаду.",
    specs: "6×3 м · моторизованная · отдельностоящая",
    images: ["/images/gallery/install-au-louvers.jpg"],
    isConceptReference: true,
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
