import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGallery, getGallerySlugs } from "@/modules/actions/actions";
import { urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface GalleryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getGallerySlugs();
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const gallery = await getGallery(params.slug);

  if (!gallery) {
    return {
      title: "Galleri ikke fundet - Vejle mod Hudcancer",
    };
  }

  return {
    title: `${gallery.title} - Galleri - Vejle mod Hudcancer`,
    description: gallery.description || `Billeder fra ${gallery.title}`,
  };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const gallery = await getGallery(params.slug);

  if (!gallery) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href="/galleri"
        className="inline-flex items-center text-vmh-gold hover:text-vmh-dark-gray transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Tilbage til galleri
      </Link>

      {/* Gallery header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-vmh-gold font-medium uppercase tracking-wide">
            {gallery.category}
          </span>
          {gallery.eventDate && (
            <>
              <span className="text-vmh-gray">•</span>
              <span className="text-xs text-vmh-gray">
                {new Date(gallery.eventDate).toLocaleDateString("da-DK")}
              </span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold text-vmh-dark-gray mb-4">
          {gallery.title}
        </h1>
        {gallery.description && (
          <p className="text-vmh-gray text-lg leading-relaxed">
            {gallery.description}
          </p>
        )}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
          >
            <Image
              src={urlFor(image).width(600).height(600).url()}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {(image.caption || image.photographer) && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.caption && (
                    <p className="text-sm font-medium mb-1">{image.caption}</p>
                  )}
                  {image.photographer && (
                    <p className="text-xs text-gray-300">
                      Foto: {image.photographer}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tags */}
      {gallery.tags && gallery.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-vmh-light-gray">
          <h3 className="text-sm font-medium text-vmh-dark-gray mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {gallery.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-vmh-light-cream text-vmh-dark-gray text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
