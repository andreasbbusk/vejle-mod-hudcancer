import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import type {
  Project,
  Gallery,
  NavigationProject,
  NavigationGallery,
} from "@/modules/types/sanity";

// Gallery Queries
const GALLERY_QUERY = groq`
  *[_type == "gallery" && slug.current == $slug][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    images[] {
      ...,
      alt,
      caption,
      photographer
    },
    category,
    featured,
    eventDate,
    tags,
    publishedAt
  }
`;

const ALL_GALLERIES_QUERY = groq`
  *[_type == "gallery"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    images[0] {
      ...,
      alt,
      caption
    },
    category,
    featured,
    eventDate,
    publishedAt
  }
`;

const GALLERIES_BY_CATEGORY_QUERY = groq`
  *[_type == "gallery" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    images[0] {
      ...,
      alt,
      caption
    },
    category,
    featured,
    eventDate,
    publishedAt
  }
`;

const FEATURED_GALLERIES_QUERY = groq`
  *[_type == "gallery" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    images[0] {
      ...,
      alt,
      caption
    },
    category,
    featured,
    eventDate,
    publishedAt
  }
`;

const GALLERY_SLUGS_QUERY = groq`
  *[_type == "gallery" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Project Queries
const PROJECT_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    fundingGoal,
    amountRaised,
    status,
    results,
    images[] {
      ...,
      alt,
      caption
    },
    startDate,
    completionDate,
    featured,
    publishedAt
  }
`;

const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    fundingGoal,
    amountRaised,
    status,
    images[0] {
      ...,
      alt,
      caption
    },
    featured,
    publishedAt
  }
`;

const FEATURED_PROJECTS_QUERY = groq`
  *[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    fundingGoal,
    amountRaised,
    status,
    images[0] {
      ...,
      alt,
      caption
    },
    featured,
    publishedAt
  }
`;

const PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Navigation Queries
const NAVIGATION_PROJECTS_QUERY = groq`
  *[_type == "project" && defined(slug.current)] | order(publishedAt desc)[0...8] {
    title,
    "slug": slug.current
  }
`;

const NAVIGATION_GALLERIES_QUERY = groq`
  *[_type == "gallery" && defined(slug.current)] | order(publishedAt desc)[0...8] {
    title,
    "slug": slug.current,
    category
  }
`;

// Gallery Actions
export async function getGallery(slug: string): Promise<Gallery | null> {
  try {
    const gallery = await client.fetch(GALLERY_QUERY, { slug });
    return gallery || null;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return null;
  }
}

export async function getAllGalleries(): Promise<Gallery[]> {
  try {
    const galleries = await client.fetch(ALL_GALLERIES_QUERY);
    return galleries || [];
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
}

export async function getGalleriesByCategory(
  category: string
): Promise<Gallery[]> {
  try {
    const galleries = await client.fetch(GALLERIES_BY_CATEGORY_QUERY, {
      category,
    });
    return galleries || [];
  } catch (error) {
    console.error("Error fetching galleries by category:", error);
    return [];
  }
}

export async function getFeaturedGalleries(): Promise<Gallery[]> {
  try {
    const galleries = await client.fetch(FEATURED_GALLERIES_QUERY);
    return galleries || [];
  } catch (error) {
    console.error("Error fetching featured galleries:", error);
    return [];
  }
}

export async function getGallerySlugs(): Promise<{ slug: string }[]> {
  try {
    const slugs = await client.fetch(GALLERY_SLUGS_QUERY);
    return slugs || [];
  } catch (error) {
    console.error("Error fetching gallery slugs:", error);
    return [];
  }
}

// Project Actions
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await client.fetch(PROJECT_QUERY, { slug });
    return project || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(ALL_PROJECTS_QUERY);
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(FEATURED_PROJECTS_QUERY);
    return projects || [];
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getProjectSlugs(): Promise<{ slug: string }[]> {
  try {
    const slugs = await client.fetch(PROJECT_SLUGS_QUERY);
    return slugs || [];
  } catch (error) {
    console.error("Error fetching project slugs:", error);
    return [];
  }
}

// Navigation Actions (for layout)
export async function getNavigationProjects(): Promise<NavigationProject[]> {
  try {
    const projects = await client.fetch(NAVIGATION_PROJECTS_QUERY);
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects for navigation:", error);
    return [];
  }
}

export async function getNavigationGalleries(): Promise<NavigationGallery[]> {
  try {
    const galleries = await client.fetch(NAVIGATION_GALLERIES_QUERY);
    return galleries || [];
  } catch (error) {
    console.error("Error fetching galleries for navigation:", error);
    return [];
  }
}

// Combined layout data
export interface LayoutData {
  projects: NavigationProject[];
  galleries: NavigationGallery[];
}

export async function getLayoutData(): Promise<LayoutData> {
  try {
    const [projects, galleries] = await Promise.all([
      getNavigationProjects(),
      getNavigationGalleries(),
    ]);

    return {
      projects,
      galleries,
    };
  } catch (error) {
    console.error("Error fetching layout data:", error);
    return {
      projects: [],
      galleries: [],
    };
  }
}
