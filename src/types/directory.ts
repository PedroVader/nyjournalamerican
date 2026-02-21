export interface BusinessListing {
  id: string;
  businessName: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  logo: string | null;
  website: string;
  phone: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  country: string;
  categorySlug: string;
  plan: "basic" | "pro" | "premium";
  status: string;
  isFeatured: boolean;
  linkType: "dofollow" | "nofollow" | "sponsored";
  clicks: number;
  impressions: number;
  createdAt: string;
  updatedAt: string;
}
