export type Pergola = {
  id: string;
  slug: string;
  title: string;
  size: string;
  width: number;
  depth: number;
  height?: number;
  type: "wall-mounted" | "freestanding";
  availability: "available" | "coming-soon" | "sold-out";
  priceFrom?: number;
  shortDescription: string;
  description: string;
  baseEquipment: string[];
  availableOptions: string[];
  images: string[];
  useCases: string[];
  seoTitle: string;
  seoDescription: string;
};

export type PergolaOption = {
  id: string;
  slug: string;
  title: string;
  category: "lighting" | "screens" | "glass" | "automation" | "color" | "drainage";
  description: string;
  images: string[];
  compatiblePergolas: string[];
  priceType: "included" | "extra" | "on-request";
};

export type Lead = {
  name: string;
  phone: string;
  messenger?: string;
  city?: string;
  objectType?: string;
  selectedPergolaId?: string;
  selectedSize?: string;
  installationType?: string;
  options?: string[];
  timeline?: string;
  comment?: string;
  sourcePage: string;
  createdAt: string;
};
