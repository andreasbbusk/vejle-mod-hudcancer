"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/modules/components/ui/navigation-menu";
import { Button } from "@/modules/components/ui/button";
import { useCurrentPath } from "@/modules/hooks/use-pathname";
import { cn } from "@/modules/lib/utils";
import DropdownMenu from "@/modules/components/layout/header/dropdown-menu";
import MobileNavigation from "@/modules/components/layout/header/mobile-menu";
import { ArrowUpRight } from "lucide-react";

interface HeaderProps {
  className?: string;
  projects?: ProjectNavItem[];
  galleries?: GalleryNavItem[];
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

interface DropdownNavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  items: Array<{
    href: string;
    label: string;
    isActive?: boolean;
  }>;
}

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

function NavItem({ href, children, isActive }: NavItemProps) {
  return (
    <NavigationMenuItem className="relative">
      {/* Active indicator line - vertical */}
      {isActive && (
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-vmh-gold rounded-full animate-in slide-in-from-top-4 duration-400 ease-out" />
      )}
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "font-medium uppercase tracking-wide text-sm py-2 px-1 relative",
            isActive
              ? "text-vmh-gold"
              : "text-vmh-dark-gray hover:text-vmh-gold"
          )}
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function DropdownNavItem({
  href,
  children,
  isActive,
  items,
}: DropdownNavItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <NavigationMenuItem className="relative">
      {/* Active indicator line - vertical */}
      {isActive && (
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-vmh-gold rounded-full animate-in slide-in-from-top-4 duration-400 ease-out" />
      )}
      <NavigationMenuTrigger
        onClick={handleClick}
        className={cn(
          "font-medium uppercase tracking-wide text-sm py-2 px-1 relative bg-transparent hover:bg-transparent data-[state=open]:bg-transparent cursor-pointer",
          isActive ? "text-vmh-gold" : "text-vmh-dark-gray hover:text-vmh-gold"
        )}
      >
        {children}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid min-w-[200px] gap-2 p-1">
          {items.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    item.isActive
                      ? "text-vmh-gold bg-vmh-light-cream"
                      : "text-vmh-dark-gray hover:text-vmh-gold hover:bg-vmh-light-cream"
                  )}
                >
                  <div className="text-sm font-medium leading-none">
                    {item.label}
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export default function Header({
  className,
  projects = [],
  galleries = [],
}: HeaderProps) {
  const { isActive } = useCurrentPath();

  // Function to determine header background based on current page
  const getHeaderBackground = () => {
    if (isActive("/")) return "bg-vmh-light-white"; // Home
    if (isActive("/events")) return "bg-vmh-light-cream"; // Events
    if (isActive("/projekter")) return "bg-vmh-light-cream"; // Projects
    if (isActive("/sponsor")) return "bg-vmh-light-cream"; // Sponsors
    if (isActive("/hvad-er-hudcancer")) return "bg-vmh-light-cream"; // What is skin cancer
    if (isActive("/hvem-er-vi") || isActive("/kontakt"))
      return "bg-vmh-light-cream"; // Who we are
    if (isActive("/galleri")) return "bg-vmh-light-cream"; // Gallery
    if (isActive("/donation")) return "bg-vmh-light-cream"; // Donation

    // Default background
    return "bg-vmh-light-cream";
  };

  // Enhanced events items with visual grouping
  const eventsItems = [
    {
      href: "/events/gallamiddag",
      title: "Gallamiddag",
      description:
        "Årlig gallamiddag med middag, underholdning og støtte til kampen mod hudcancer",
      isActive: isActive("/events/gallamiddag"),
    },
    {
      href: "/events/auktion",
      title: "Auktion",
      description:
        "Auktion til fordel for kampen mod hudcancer med spændende genstande og oplevelser",
      isActive: isActive("/events/auktion"),
      isSubItem: true, // This makes it appear as a sub-item under Gallamiddag
      addSeparator: true, // Add separator after Auktion to separate from Torveevent
    },
    {
      href: "/events/torveevent",
      title: "Torveevent",
      description:
        "Torveevent med information, aktiviteter og mulighed for at støtte organisationen",
      isActive: isActive("/events/torveevent"),
    },
  ];

  // Generate enhanced project preview items
  const enhancedProjekterItems = projects.map((project) => ({
    href: `/projekter/${project.slug}`,
    title: project.title,
    description: project.description,
    image: project.image,
    isActive: isActive(`/projekter/${project.slug}`),
  }));

  // Generate enhanced gallery preview items
  const enhancedGalleriItems = galleries.map((gallery) => ({
    href: `/galleri/${gallery.slug}`,
    title: gallery.title,
    description: `${gallery.category} galleri`,
    isActive: isActive(`/galleri/${gallery.slug}`),
  }));

  const isEventsActive = isActive("/events");
  const isProjekterActive = isActive("/projekter");
  const isGalleriActive = isActive("/galleri");
  const isHvemErViActive = isActive("/hvem-er-vi") || isActive("/kontakt");

  return (
    <header className={cn(getHeaderBackground(), className)}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 justify-between items-center h-20 lg:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/header-logo.png"
                alt="Vejle mod Hudcancer"
                width={300}
                height={60}
                className="h-12 w-auto -translate-y-2"
                priority
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex space-x-6 font-adelle-sans">
                <DropdownMenu
                  href="/events"
                  isActive={isEventsActive}
                  items={eventsItems}
                  viewAllText="Se events"
                  showIcons={false}
                >
                  Events
                </DropdownMenu>
                <DropdownMenu
                  href="/projekter"
                  isActive={isProjekterActive}
                  items={enhancedProjekterItems}
                  viewAllText="Se alle projekter"
                >
                  Projekter
                </DropdownMenu>
                <DropdownMenu
                  href="/galleri"
                  isActive={isGalleriActive}
                  items={enhancedGalleriItems}
                  viewAllText="Se alle gallerier"
                  showIcons={false}
                >
                  Galleri
                </DropdownMenu>
                <NavItem href="/sponsor" isActive={isActive("/sponsor")}>
                  Sponsorer
                </NavItem>
                <NavItem
                  href="/hvad-er-hudcancer"
                  isActive={isActive("/hvad-er-hudcancer")}
                >
                  Hudcancer
                </NavItem>
                <DropdownNavItem
                  href="/hvem-er-vi"
                  isActive={isHvemErViActive}
                  items={[
                    {
                      href: "/kontakt",
                      label: "Kontakt",
                      isActive: isActive("/kontakt"),
                    },
                  ]}
                >
                  Hvem er vi
                </DropdownNavItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Donation CTA */}
          <div className="flex items-center space-x-4">
            <Link href="/donation">
              <Button
                variant="primary"
                size="lg"
                className="font-bold font-adelle-sans"
              >
                Støt nu <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-vmh-dark-gray hover:text-vmh-gold hover:bg-vmh-light-cream transition-colors duration-200"
              aria-label="Åbn menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation projects={projects} galleries={galleries} />
      </div>
    </header>
  );
}
