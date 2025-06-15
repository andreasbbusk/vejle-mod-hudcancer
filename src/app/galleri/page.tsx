import type { Metadata } from "next";
import { getAllGalleries } from "@/modules/actions/actions";
import Link from "next/link";
import { urlFor } from "@/sanity/client";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Galleri - Vejle mod Hudcancer",
  description: "Billeder fra vores events og aktiviteter",
};

export default async function GalleriPage() {
  const galleries = await getAllGalleries();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-vmh-dark-gray mb-6">Galleri</h1>
      <p className="text-vmh-gray mb-8">
        Se billeder fra vores events, galaer og andre aktiviteter.
      </p>

      {galleries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <Link
              key={gallery._id}
              href={`/galleri/${gallery.slug.current}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {gallery.images[0] && (
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={urlFor(gallery.images[0]).width(400).height(225).url()}
                    alt={gallery.images[0].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-vmh-dark-gray mb-2 group-hover:text-vmh-gold transition-colors">
                  {gallery.title}
                </h2>
                {gallery.description && (
                  <p className="text-vmh-gray text-sm mb-2 line-clamp-2">
                    {gallery.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-vmh-gold font-medium uppercase tracking-wide">
                    {gallery.category}
                  </span>
                  <span className="text-xs text-vmh-gray">
                    {gallery.images.length} billede
                    {gallery.images.length !== 1 ? "r" : ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-vmh-gray">Ingen gallerier tilgængelige endnu.</p>
        </div>
      )}
    </div>
  );
}
