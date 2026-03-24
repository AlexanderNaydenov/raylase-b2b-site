export type ProductCategory = {
  name: string;
  slug: string;
};

export type ProductCard = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  excerpt?: string | null;
  heroImageUrl?: string | null;
  isFeatured?: boolean | null;
  category?: ProductCategory | null;
};

export type ProductDetail = ProductCard & {
  body?: { html: string } | null;
  specs?: { label: string; value: string }[] | null;
  relatedProducts: ProductCard[];
};

export type MarketingPageCard = {
  id: string;
  title: string;
  slug: string;
  pageType: string;
  excerpt?: string | null;
  eventDate?: string | null;
  location?: string | null;
  heroImageUrl?: string | null;
};

export type MarketingPageDetail = MarketingPageCard & {
  body?: { html: string } | null;
};
