export type ProductCategory = "bioclimatic" | "louvered";
export type DriveType = "motorized" | "manual" | "both";
export type SystemType = "freestanding" | "wall-mounted" | "both";
export type ProductStatus = "available" | "coming-soon" | "archived";
export type OptionCategory = "screens" | "glass" | "shutters" | "lighting" | "climate" | "automation";
export type PriceType = "included" | "extra" | "on-request";

export type ProfileColor = {
  id: string;
  ral: string;
  name: string;
  swatch?: string;
};

export type StandardSize = {
  width: number;
  depth: number;
};

export type SizeRange = {
  minWidth: number;
  maxWidth: number;
  minDepth: number;
  maxDepth: number;
  customizable: boolean;
  standardSizes?: StandardSize[];
};

export type ProductSpecs = {
  post: string;
  blade: string;
  material: string;
  waterDrainage: boolean;
};

export type Product = {
  id: string;
  slug: string;
  seriesName: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProductCategory;
  drive: DriveType;
  systemType: SystemType;
  status: ProductStatus;
  sizeRange: SizeRange;
  specs: ProductSpecs;
  baseEquipment: string[];
  compatibleOptions: string[];
  profileColors: ProfileColor[];
  useCases: string[];
  images: string[];
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
};

export type Option = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: OptionCategory;
  description: string;
  features: string[];
  variants?: string[];
  images: string[];
  compatibility: {
    all: boolean;
    productIds: string[];
  };
  priceType: PriceType;
  seo: {
    title: string;
    description: string;
  };
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
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
