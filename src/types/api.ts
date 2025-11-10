// API Response Types for Strapi

import {Dayjs} from "dayjs";

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CustomApiResponse {
    // data: Object[];
    data: PageHeaderData;
    metadata?: Record<string, unknown>;
    errors?: Record<string, unknown>;
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// Page Home Types
export interface PageHomeData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  Hero: HeroData;
  seo: SeoData | null;
  featured_section?: FeaturedSectionData | null;
  createdBy: UserData;
  updatedBy: UserData;
}

export interface ButtonType {
    label: string;
    target_url?: string;
    variant?: "contained" | "link"|'outlined'| null;
    icon?: 'internal'| 'external' | 'download';
    color: "primary" | "secondary" | "tertiary";

}

export interface HeroData {
  id: number;
  main_title: string;
  array_text: string[];
  description: string;
  is_available: boolean;
  buttons?:ButtonType[];
  featured_banner?: { url: string } | { url: string }[] | null;
}

export interface BentoMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
}

export interface BentoImage {
  id: number;
  image_name?: string | null;
  target_url?: string | null;
  classname?: string | null;
  image_col?: (BentoMedia | null)[] | null;
}

export interface ServicesSectionImage {
  url: string;
}

export interface ServicesSectionItem {
  title: string;
  description?: string | null;
  featured_image?: ServicesSectionImage | null;
  button?: ButtonType[] | null;
}

export interface ServicesSectionContent {
  title: string;
  is_available: boolean;
  services_list: ServicesSectionItem[];
}

export interface BentoBoxColumn {
  id: number;
  is_available: boolean;
  title?: string | null;
  description?: string | null;
  image_col?: (BentoImage | null)[] | null;
}

export interface FeaturedSectionData {
  is_available: boolean;
  title?: string | null;
  description?: string | null;
  bento_box?: BentoBoxColumn[] | null;
}

export interface ServicesSectionResponse {
  services_section: ServicesSectionContent;
}

export interface SeoData {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: Record<string, unknown>;
  metaViewport: string;
  canonicalURL: string;
}

// Page Header Component
export interface PageHeaderData {
    id: number;
    title: string;
    description: string;
    backgroundImage?: {
        id: number;
        url: string;
        alternativeText?: string;
    };
}

export interface PageDataType{
    metadata: SeoData;
    page_header: PageHeaderData;
    long_description?: RichTextBlock[];
    id: number;
    data:{
        metadata: SeoData;
        page_header: PageHeaderData;
        long_description?: string;
    },
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface UserData {
  id: number;
  documentId: string;
  firstname: string;
  lastname: string;
  username: string | null;
  email: string;
  isActive: boolean;
  blocked: boolean;
  preferedLanguage: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

// Rich text content block types
export interface RichTextBlock {
  type: string;
  children: Array<{
    text: string;
    type: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

// Articles Types
export interface ArticleData {
  id: number;
  documentId: string;
  isAvailable: boolean;
  slug: string;
  Content: RichTextBlock[];
  CreatedDate: string | null;
  LastUpdate: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
}

// Location Types
export interface LocationData {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  officesDescription: string | null;
  articlesDescription: string | null;
  offices: OfficeData[];
}

// Updated OfficeData to match API response
export interface OfficeData {
  id: number;
  documentId: string;
  name: string;
  available: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Description: string;
  telephone: string;
  email: string;
  galleryDescription: string | null;
  neutralsDescription: string | null;
  address: string | null;
  featuredImage: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      thumbnail?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    related: Record<string, unknown>[];
  };
}

// Services Types
export interface ServiceData {
  id: number;
  documentId: string;
  name: string;
  description: string;
  icon: string | null;
  isAvailable: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MediaItem {
    url: string;
    type?: 'image' | 'video';
    alt?: string;
}

// Page Location Data
export interface PageLocationData {
  id: number;
  documentId: string;
  featured_block: {
      featured_media: string | MediaItem[]
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  pageHeader: PageHeaderData;
  seo: SeoData;
  createdBy: UserData;
  updatedBy: UserData;
}

// Page Location Data
export interface PageAboutUsData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    locale: string | null;
    page_header: PageHeaderData;
    intro_text: Record<string, unknown> | null;
    metadata: SeoData;
    createdBy: UserData;
    updatedBy: UserData;
}
// Page Location Data
export interface PageOurTeamData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    locale: string | null;
    page_header: PageHeaderData;
    metadata: SeoData;
    createdBy: UserData;
    updatedBy: UserData;
}

// Member Types
export interface MemberCategory {
    id: number;
    title: string;
    documentId: string;
}

// Bio content type for BlocksRenderer
export interface BioContent {
    type: string;
    children?: unknown[];
    [key: string]: unknown;
}

export interface Member {
    quote: string;
    posts: {
        createdAt: string;
        CreatedDate: string;
        id: number;
        title: string;
        slug: string;
    }[];
    id: number;
    name: string;
    slug: string;
    description: string;
    bio?: BioContent[];
    avatar?: {
        url: string;
    };
    member_category?: MemberCategory;
}

export interface NeutralType {
    short_description: string;
    id: number;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    avatar:{
        url: string;
    }
}

export interface ArticlesType{
    short_description: string;
    id: number;
    articleImage: { url: string}
    title: string;
    date: Dayjs | string;
    slug: string;
    isAvailable: boolean;
    neutral: NeutralType;
    Content: RichTextBlock[];
    articles_category: {
        id: number;
        name: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface MembersResponse {
    data: Member[];
}

export interface RelatedArticleCard {
    name: string;
    url: string;
    image?: string;
}


// API Configuration
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

// Environment Variables
export interface EnvConfig {
  STRAPI_URL: string;
  STRAPI_API_TOKEN?: string;
}
