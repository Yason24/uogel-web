import type { Option, DiagramItem } from "@/types";

const zipDiagrams: DiagramItem[] = [
  { src: "/images/diagrams/zip-screen-catalog-page.jpg", caption: "ZIP Screen 100/120 — конфигурации и цвета ткани" },
];
const framelessGlassDiagrams: DiagramItem[] = [
  { src: "/images/diagrams/frameless-glass-catalog-page.jpg", caption: "Безрамные раздвижные двери — конфигурации до 2500 мм" },
];
const narrowFrameGlassDiagrams: DiagramItem[] = [
  { src: "/images/diagrams/narrow-frame-glass-catalog-page.jpg", caption: "Узкорамные раздвижные двери — конфигурации до 2700 мм" },
];
const shuttersDiagrams: DiagramItem[] = [
  { src: "/images/diagrams/aluminium-shutters-catalog-page.jpg", caption: "Алюминиевые ставни — Fixed, Sliding, Bi-Folding, Swing" },
];
const climateDiagrams: DiagramItem[] = [
  { src: "/images/diagrams/catalog-overview.jpg", caption: "Климатические компоненты UOGEL — схема расположения" },
];

export const options: Option[] = [
  {
    id: "zip-screen",
    slug: "zip-screen",
    title: "ZIP-экраны",
    subtitle: "Боковое ограждение от солнца, ветра и взглядов",
    category: "screens",
    description:
      "Вертикальные ZIP-системы закрывают боковые проёмы перголы. Доступны ширины 100 и 120 см. Помогают создать защищённую закрытую зону без полного остекления.",
    features: [
      "Ширина полотна 100 и 120 см",
      "Защита от солнца, ветра и взглядов",
      "Ткань с различной степенью затенения",
      "Совместимы со всеми сериями UOGEL",
    ],
    variants: ["ZIP Screen 100", "ZIP Screen 120"],
    images: ["/images/options/zip-screen.jpg"],
    diagrams: zipDiagrams,
    compatibility: { all: true, productIds: [] },
    priceType: "on-request",
    seo: {
      title: "ZIP-экраны для пергол UOGEL",
      description:
        "Боковые ZIP-системы для пергол UOGEL: ширина 100 и 120 см, защита от солнца и ветра. Расчёт по выбранной серии.",
    },
  },
  {
    id: "frameless-glass",
    slug: "frameless-glass",
    title: "Безрамные стеклянные двери",
    subtitle: "Полное остекление без видимого профиля",
    category: "glass",
    description:
      "Раздвижная стеклянная система без внешнего профиля. Высота установки до 2500 мм. Создаёт закрытое стеклянное пространство с минимальными видимыми конструкциями.",
    features: [
      "Высота до 2500 мм",
      "Безрамная конструкция",
      "Раздвижная или складная система",
      "Закалённое стекло",
    ],
    images: ["/images/options/frameless-glass.jpg"],
    diagrams: framelessGlassDiagrams,
    compatibility: { all: false, productIds: ["a13", "c10", "c7", "c4"] },
    priceType: "on-request",
    seo: {
      title: "Безрамные стеклянные двери для пергол UOGEL",
      description:
        "Безрамные стеклянные двери для пергол UOGEL A13, C10, C7, C4/M4. Высота до 2500 мм. Расчёт по модели и конфигурации.",
    },
  },
  {
    id: "narrow-frame-glass",
    slug: "narrow-frame-glass",
    title: "Узкорамные стеклянные двери",
    subtitle: "Остекление с узким алюминиевым профилем",
    category: "glass",
    description:
      "Раздвижная стеклянная система с тонким алюминиевым профилем. Высота установки до 2700 мм. Обеспечивает большую жёсткость конструкции при сохранении прозрачности.",
    features: [
      "Высота до 2700 мм",
      "Узкий алюминиевый профиль",
      "Раздвижная система",
      "Повышенная жёсткость",
    ],
    images: ["/images/options/narrow-frame-glass.jpg"],
    diagrams: narrowFrameGlassDiagrams,
    compatibility: { all: false, productIds: ["a13", "c10", "c7", "c4"] },
    priceType: "on-request",
    seo: {
      title: "Узкорамные стеклянные двери для пергол UOGEL",
      description:
        "Узкорамные стеклянные двери для пергол UOGEL. Высота до 2700 мм, узкий профиль, раздвижная система. Расчёт по модели.",
    },
  },
  {
    id: "aluminium-shutters",
    slug: "aluminium-shutters",
    title: "Алюминиевые ставни",
    subtitle: "Боковая защита из алюминиевых панелей",
    category: "shutters",
    description:
      "Aluminium Shutters — боковое ограждение из алюминиевых панелей. Доступны четыре варианта открывания: фиксированные, раздвижные, складные и распашные. Обеспечивают защиту и приватность.",
    features: [
      "Четыре варианта открывания",
      "Алюминиевые панели с порошковым покрытием",
      "Защита от ветра и посторонних взглядов",
      "Цвет в тон профиля перголы",
    ],
    variants: ["Fixed", "Sliding", "Bi-Folding", "Swing"],
    images: ["/images/options/aluminium-shutters.webp"],
    diagrams: shuttersDiagrams,
    compatibility: { all: false, productIds: ["a13", "c10", "c7", "c4"] },
    priceType: "on-request",
    seo: {
      title: "Алюминиевые ставни для пергол UOGEL",
      description:
        "Aluminium Shutters для пергол UOGEL: Fixed, Sliding, Bi-Folding, Swing. Защита и приватность для террас. Расчёт по модели.",
    },
  },
  {
    id: "ceiling-fan",
    slug: "ceiling-fan",
    title: "Потолочный вентилятор",
    subtitle: "Охлаждение и циркуляция воздуха под перголой",
    category: "climate",
    description:
      "Ceiling Fan — потолочный вентилятор, интегрированный в конструкцию перголы. Создаёт движение воздуха и снижает ощущаемую температуру в жаркую погоду.",
    features: [
      "Интеграция в профиль перголы",
      "Регулировка скорости",
      "Летний и зимний режим вращения",
      "Совместим с моторизованными сериями",
    ],
    images: ["/images/options/ceiling-fan.jpg"],
    diagrams: climateDiagrams,
    compatibility: { all: false, productIds: ["a13", "c10", "c7"] },
    priceType: "on-request",
    seo: {
      title: "Потолочный вентилятор для пергол UOGEL A13, C10, C7",
      description:
        "Ceiling Fan для пергол UOGEL: охлаждение и циркуляция воздуха. Доступен для серий A13, C10, C7. Расчёт по конфигурации.",
    },
  },
  {
    id: "electrical-heater",
    slug: "electrical-heater",
    title: "Электрический обогреватель",
    subtitle: "Продление сезона использования террасы",
    category: "climate",
    description:
      "Electrical Heater — инфракрасный обогреватель, встраиваемый в конструкцию перголы. Позволяет использовать террасу в прохладное время года.",
    features: [
      "Инфракрасный нагрев",
      "Интеграция в профиль перголы",
      "Регулировка мощности",
      "Продление сезона до ранней весны / поздней осени",
    ],
    images: ["/images/options/electrical-heater.jpg"],
    diagrams: climateDiagrams,
    compatibility: { all: false, productIds: ["a13", "c10", "c7"] },
    priceType: "on-request",
    seo: {
      title: "Электрический обогреватель для пергол UOGEL A13, C10, C7",
      description:
        "Electrical Heater для пергол UOGEL: инфракрасный обогрев для террасы. Доступен для серий A13, C10, C7. Расчёт по конфигурации.",
    },
  },
  {
    id: "rain-wind-sensors",
    slug: "rain-wind-sensors",
    title: "Датчики дождя и ветра",
    subtitle: "Автоматическая защита при изменении погоды",
    category: "automation",
    description:
      "Датчики дождя и ветра автоматически закрывают ламели при осадках или усилении ветра. Защищают конструкцию и обеспечивают удобство без ручного вмешательства.",
    features: [
      "Автоматическое закрытие при дожде",
      "Защита от сильного ветра",
      "Интеграция с моторизованным приводом",
      "Совместимы с сериями A13, C10, C7, C4",
    ],
    images: [],
    compatibility: { all: false, productIds: ["a13", "c10", "c7", "c4"] },
    priceType: "on-request",
    seo: {
      title: "Датчики дождя и ветра для пергол UOGEL",
      description:
        "Датчики дождя и ветра для моторизованных пергол UOGEL A13, C10, C7, C4. Автоматическая защита конструкции. Расчёт по конфигурации.",
    },
  },
];

// Backward compatibility — used by src/app/options/page.tsx
export const pergolaOptions = options;
