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

  const eventsItems = [
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

  return (
    <header className={cn("bg-vmh-light-cream", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/header-logo.png"
                alt="Vejle mod Hudcancer"
                width={300}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex space-x-6">
                <DropdownNavItem
                  href="/events"
                  isActive={isEventsActive}
                  items={eventsItems}
                >
                  EVENTS
                </DropdownNavItem>
                <DropdownNavItem
                  href="/projekter"
                  isActive={isProjekterActive}
                  items={projekterItems}
                >
                  PROJEKTER
                </DropdownNavItem>
                <NavItem href="/sponsor" isActive={isActive("/sponsor")}>
                  SPONSOR
                </NavItem>
                <NavItem
                  href="/hvad-er-hudcancer"
                  isActive={isActive("/hvad-er-hudcancer")}
                >
                  HVAD ER HUDCANCER
                </NavItem>
                <DropdownNavItem
                  href="/hvem-er-vi"
                  isActive={isHvemErViActive}
                  items={hvemErViItems}
                >
                  HVEM ER VI
                </DropdownNavItem>
                <DropdownNavItem
                  href="/galleri"
                  isActive={isGalleriActive}
                  items={galleriItems}
                >
                  GALLERI
                </DropdownNavItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Donation CTA */}
          <div className="flex items-center space-x-4">
            <Link href="/donation">
              <Button variant="primary" size="lg" className="font-bold">
                Støt nu ↗
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
                {eventsItems.map((item) => (
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
          </nav>
        </div>
      </div>
    </header>
  );
}
