"use client";

import Link from "next/link";
import { useCurrentPath } from "@/modules/hooks/use-pathname";
import { cn } from "@/modules/lib/utils";

interface ProjectNavItem {
  title: string;
  slug: string;
  description?: string;
  fundingGoal?: number;
  amountRaised?: number;
  status?: string;
  image?: string;
}

interface GalleryNavItem {
  title: string;
  slug: string;
  category: string;
}

interface MobileNavigationProps {
  isOpen?: boolean;
  projects?: ProjectNavItem[];
  galleries?: GalleryNavItem[];
}

export default function MobileNavigation({
  isOpen = true,
  projects = [],
  galleries = [],
}: MobileNavigationProps) {
  const { isActive } = useCurrentPath();

  // Simple events items for mobile navigation
  const simpleEventsItems = [
    {
      href: "/events/gallamiddag",
      label: "Gallamiddag",
      isActive: isActive("/events/gallamiddag"),
    },
    {
      href: "/events/torveevent",
      label: "Torveevent",
      isActive: isActive("/events/torveevent"),
    },
    {
      href: "/events/auktion",
      label: "Auktion",
      isActive: isActive("/events/auktion"),
    },
  ];

  // Generate project navigation items from props
  const projekterItems = projects.map((project) => ({
    href: `/projekter/${project.slug}`,
    label: project.title,
    isActive: isActive(`/projekter/${project.slug}`),
  }));

  // Generate gallery navigation items from props
  const galleriItems = galleries.map((gallery) => ({
    href: `/galleri/${gallery.slug}`,
    label: gallery.title,
    isActive: isActive(`/galleri/${gallery.slug}`),
  }));

  const hvemErViItems = [
    {
      href: "/kontakt",
      label: "Kontakt",
      isActive: isActive("/kontakt"),
    },
  ];

  const isEventsActive = isActive("/events");
  const isProjekterActive = isActive("/projekter");
  const isGalleriActive = isActive("/galleri");
  const isHvemErViActive = isActive("/hvem-er-vi") || isActive("/kontakt");

  if (!isOpen) return null;

  return (
    <div className="lg:hidden py-4 border-t border-vmh-light-gray">
      <nav className="flex flex-col space-y-4">
        {/* Events Section */}
        <div className="space-y-2">
          <Link
            href="/events"
            className={cn(
              "font-medium uppercase tracking-wide text-sm relative pl-6",
              isEventsActive ? "text-vmh-gold" : "text-vmh-dark-gray"
            )}
          >
            {isEventsActive && (
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-vmh-gold rounded-full animate-in slide-in-from-left-2 duration-300 ease-out" />
            )}
            EVENTS
          </Link>
          <div className="pl-10 space-y-2">
            {simpleEventsItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block text-sm font-medium relative pl-4",
                  item.isActive ? "text-vmh-gold" : "text-vmh-dark-gray"
                )}
              >
                {item.isActive && (
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0.5 h-3 bg-vmh-gold rounded-full animate-in slide-in-from-left-1 duration-300 ease-out" />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Projekter Section */}
        <div className="space-y-2">
          <Link
            href="/projekter"
            className={cn(
              "font-medium uppercase tracking-wide text-sm relative pl-6",
              isProjekterActive ? "text-vmh-gold" : "text-vmh-dark-gray"
            )}
          >
            {isProjekterActive && (
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-vmh-gold rounded-full animate-in slide-in-from-left-2 duration-300 ease-out" />
            )}
            PROJEKTER
          </Link>
          <div className="pl-10 space-y-2">
            {projekterItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block text-sm font-medium relative pl-4",
                  item.isActive ? "text-vmh-gold" : "text-vmh-dark-gray"
                )}
              >
                {item.isActive && (
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0.5 h-3 bg-vmh-gold rounded-full animate-in slide-in-from-left-1 duration-300 ease-out" />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Galleri Section */}
        <div className="space-y-2">
          <Link
            href="/galleri"
            className={cn(
              "font-medium uppercase tracking-wide text-sm relative pl-6",
              isGalleriActive ? "text-vmh-gold" : "text-vmh-dark-gray"
            )}
          >
            {isGalleriActive && (
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-vmh-gold rounded-full animate-in slide-in-from-left-2 duration-300 ease-out" />
            )}
            GALLERI
          </Link>
          <div className="pl-10 space-y-2">
            {galleriItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block text-sm font-medium relative pl-4",
                  item.isActive ? "text-vmh-gold" : "text-vmh-dark-gray"
                )}
              >
                {item.isActive && (
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0.5 h-3 bg-vmh-gold rounded-full animate-in slide-in-from-left-1 duration-300 ease-out" />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Other Navigation Items */}
        <Link
          href="/sponsor"
          className={cn(
            "font-medium uppercase tracking-wide text-sm relative pl-6",
            isActive("/sponsor") ? "text-vmh-gold" : "text-vmh-dark-gray"
          )}
        >
          {isActive("/sponsor") && (
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-vmh-gold rounded-full animate-in slide-in-from-left-2 duration-300 ease-out" />
          )}
          SPONSOR
        </Link>
        <Link
          href="/hvad-er-hudcancer"
          className={cn(
            "font-medium uppercase tracking-wide text-sm relative pl-6",
            isActive("/hvad-er-hudcancer")
              ? "text-vmh-gold"
              : "text-vmh-dark-gray"
          )}
        >
          {isActive("/hvad-er-hudcancer") && (
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-vmh-gold rounded-full animate-in slide-in-from-left-2 duration-300 ease-out" />
          )}
          HVAD ER HUDCANCER
        </Link>

        {/* Hvem er vi Section */}
        <div className="space-y-2">
          <Link
            href="/hvem-er-vi"
            className={cn(
              "font-medium uppercase tracking-wide text-sm relative pl-6",
              isHvemErViActive ? "text-vmh-gold" : "text-vmh-dark-gray"
            )}
          >
            {isHvemErViActive && (
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-vmh-gold rounded-full animate-in slide-in-from-left-2 duration-300 ease-out" />
            )}
            HVEM ER VI
          </Link>
          <div className="pl-10 space-y-2">
            {hvemErViItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block text-sm font-medium relative pl-4",
                  item.isActive ? "text-vmh-gold" : "text-vmh-dark-gray"
                )}
              >
                {item.isActive && (
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0.5 h-3 bg-vmh-gold rounded-full animate-in slide-in-from-left-1 duration-300 ease-out" />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
