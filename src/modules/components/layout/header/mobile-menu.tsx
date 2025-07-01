"use client";

import Link from "next/link";
import { useCurrentPath } from "@/modules/hooks/use-pathname";
import { cn } from "@/modules/lib/utils";
import { Button } from "@/modules/components/ui/button";

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
  onClose?: () => void;
  headerBackground?: string;
}

export default function MobileNavigation({
  isOpen = false,
  onClose,
  headerBackground = "bg-vmh-light-white",
}: MobileNavigationProps) {
  const { isActive } = useCurrentPath();

  const handleLinkClick = () => {
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "block lg:hidden absolute left-0 right-0 top-full z-[60] rounded-b-2xl shadow-lg",
        headerBackground
      )}
    >
      <div className="px-6 py-6 max-h-[80vh] overflow-y-auto flex flex-col">
        {/* Header section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-vmh-dark-gray">
              Hjælp os med at gøre en forskel...
            </span>
            <div className="bg-vmh-gold text-vmh-dark-gray text-xs font-semibold px-2 py-1 rounded-full">
              5
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="space-y-1">
          <Link
            href="/events"
            onClick={handleLinkClick}
            className={cn(
              "block text-2xl font-light leading-relaxed py-2 transition-colors",
              isActive("/events")
                ? "text-vmh-gold"
                : "text-vmh-dark-gray hover:text-vmh-gold"
            )}
          >
            Events
          </Link>

          <Link
            href="/projekter"
            onClick={handleLinkClick}
            className={cn(
              "block text-2xl font-light leading-relaxed py-2 transition-colors",
              isActive("/projekter")
                ? "text-vmh-gold"
                : "text-vmh-dark-gray hover:text-vmh-gold"
            )}
          >
            Projekter
          </Link>

          <Link
            href="/hvem-er-vi"
            onClick={handleLinkClick}
            className={cn(
              "block text-2xl font-light leading-relaxed py-2 transition-colors",
              isActive("/hvem-er-vi")
                ? "text-vmh-gold"
                : "text-vmh-dark-gray hover:text-vmh-gold"
            )}
          >
            Hvem er vi
          </Link>

          <Link
            href="/galleri"
            onClick={handleLinkClick}
            className={cn(
              "block text-2xl font-light leading-relaxed py-2 transition-colors",
              isActive("/galleri")
                ? "text-vmh-gold"
                : "text-vmh-dark-gray hover:text-vmh-gold"
            )}
          >
            Galleri
          </Link>

          <Link
            href="/hvad-er-hudcancer"
            onClick={handleLinkClick}
            className={cn(
              "block text-2xl font-light leading-relaxed py-2 transition-colors",
              isActive("/hvad-er-hudcancer")
                ? "text-vmh-gold"
                : "text-vmh-dark-gray hover:text-vmh-gold"
            )}
          >
            Hudcancer
          </Link>

          <Link
            href="/sponsor"
            onClick={handleLinkClick}
            className={cn(
              "block text-2xl font-light leading-relaxed py-2 transition-colors",
              isActive("/sponsor")
                ? "text-vmh-gold"
                : "text-vmh-dark-gray hover:text-vmh-gold"
            )}
          >
            Sponsor
          </Link>
        </nav>

        {/* Donate button at bottom */}
        <div className="mt-6 pb-4">
          <Button
            asChild
            size="lg"
            className="w-full bg-vmh-gold hover:bg-vmh-gold/90 text-vmh-dark-gray font-semibold py-4 px-8 rounded-full text-lg transition-all duration-200 hover:scale-[1.02]"
          >
            <Link href="/donation" onClick={handleLinkClick}>
              Doner nu
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
