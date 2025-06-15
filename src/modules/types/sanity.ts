import type { PortableTextBlock, Image, Slug } from "sanity";

export interface Project {
  _id: string;
  _type: "project";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  description: string;
  fundingGoal: number;
  amountRaised: number;
  status:
    | "planning"
    | "fundraising"
    | "funded"
    | "in-progress"
    | "completed"
    | "on-hold";
  results?: PortableTextBlock[];
  images?: ProjectImage[];
  startDate?: string;
  completionDate?: string;
  featured: boolean;
  publishedAt: string;
}

export interface ProjectImage extends Image {
  alt: string;
  caption?: string;
}

export type ProjectStatus = Project["status"];

export interface Gallery {
  _id: string;
  _type: "gallery";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  description?: string;
  images: GalleryImage[];
  category: "events" | "gala" | "torveevent" | "projects" | "team" | "general";
  featured: boolean;
  eventDate?: string;
  tags?: string[];
  publishedAt: string;
}

export interface GalleryImage extends Image {
  alt: string;
  caption?: string;
  photographer?: string;
}

export type GalleryCategory = Gallery["category"];

// Navigation types for layout
export interface NavigationProject {
  title: string;
  slug: string;
}

export interface NavigationGallery {
  title: string;
  slug: string;
  category: GalleryCategory;
}
