"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/modules/components/ui/navigation-menu";
import { Button } from "@/modules/components/ui/button";
import { useCurrentPath } from "@/modules/hooks/use-pathname";
import { cn } from "@/modules/lib/utils";
import DropdownMenu from "@/modules/components/layout/header/dropdown-menu";
import MobileNavigation from "@/modules/components/layout/header/mobile-menu";
import { ArrowUpRight, Menu, X } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
            "font-medium tracking-wide text-sm py-2 px-1 relative",
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

// Blur Overlay Component
function BlurOverlay({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`fixed inset-0 backdrop-blur-md z-40 pointer-events-none transition-all duration-800 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "rgba(255, 255, 255, 0.02)", // Very subtle white overlay
        transitionProperty: "opacity, backdrop-filter",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />
  );
}

export default function Header({
  className,
  projects = [],
  galleries = [],
}: HeaderProps) {
  const { isActive } = useCurrentPath();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const donationButtonRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

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

  // GSAP Scroll Animation Setup
  useEffect(() => {
    if (typeof window === "undefined" || !headerRef.current) return;

    const header = headerRef.current;

    // Set initial styles for animation
    gsap.set(header, {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transformOrigin: "center top",
    });

    // Create the glass effect animation
    const glassTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "20px top",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        refreshPriority: -1,
      },
    });

    // Animate to glass header with top margin
    glassTl.to(header, {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: "20px 20px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
      marginTop: "1rem",
      marginRight: "4rem",
      marginLeft: "4rem",
      duration: 0.2,
      ease: "power2.inOut",
    });

    // Create hide/reveal effect on scroll
    // ScrollTrigger.create({
    //   trigger: document.body,
    //   start: "100px top",
    //   onUpdate: (self) => {
    //     if (self.direction === -1) {
    //       // Scrolling up - show header
    //       gsap.to(header, {
    //         y: 0,
    //         duration: 0.1,
    //         ease: "power3.out",
    //       });
    //     } else {
    //       // Scrolling down - hide header
    //       gsap.to(header, {
    //         y: -100,
    //         duration: 0.1,
    //         ease: "power3.out",
    //       });
    //     }
    //   },
    // });

    // Refresh ScrollTrigger on window resize and content changes
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Also refresh after a small delay to account for dynamic content
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ScrollTrigger.killAll();
      window.removeEventListener("resize", handleResize);
      clearTimeout(refreshTimeout);
    };
  }, []);

  // Donation button hover animations
  const handleDonationHover = () => {
    if (!donationButtonRef.current || !arrowRef.current) return;

    const tl = gsap.timeline();
    tl.to(donationButtonRef.current, {
      scale: 1.05,
      boxShadow: "0 8px 32px rgba(218, 165, 32, 0.3)",
      duration: 0.3,
      ease: "power2.out",
    }).to(
      arrowRef.current,
      {
        x: 3,
        y: -3,
        duration: 0.3,
        ease: "power2.out",
      },
      "<"
    );
  };

  const handleDonationLeave = () => {
    if (!donationButtonRef.current || !arrowRef.current) return;

    const tl = gsap.timeline();
    tl.to(donationButtonRef.current, {
      scale: 1,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    }).to(
      arrowRef.current,
      {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "<"
    );
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
  const projectItems = projects.map((project) => ({
    href: `/projekter/${project.slug}`,
    title: project.title,
    description: project.description,
    image: project.image,
    isActive: isActive(`/projekter/${project.slug}`),
  }));

  // Generate enhanced gallery preview items
  const galleryItems = galleries.map((gallery) => ({
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
    <>
      <header
        ref={headerRef}
        className={cn(
          getHeaderBackground(),
          "relative z-[70] transition-all duration-200",
          className
        )}
      >
        <div ref={containerRef} className="px-4 sm:px-6 lg:px-12">
          <div
            ref={innerRef}
            className="flex justify-between items-center h-16 lg:h-20"
          >
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/header-logo.png"
                  alt="Vejle mod Hudcancer"
                  width={300}
                  height={60}
                  className="h-12 w-auto -translate-y-1"
                  priority
                />
              </Link>
            </div>
            {/* Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="flex space-x-4 font-adelle-sans">
                  <DropdownMenu
                    href="/events"
                    isActive={isEventsActive}
                    items={eventsItems}
                    viewAllText="Se events"
                    showIcons={false}
                    onHoverChange={setIsDropdownOpen}
                  >
                    Events
                  </DropdownMenu>
                  <DropdownMenu
                    href="/projekter"
                    isActive={isProjekterActive}
                    items={projectItems}
                    viewAllText="Se projekter"
                    showIcons={false}
                    onHoverChange={setIsDropdownOpen}
                  >
                    Projekter
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
                  <DropdownMenu
                    href="/galleri"
                    isActive={isGalleriActive}
                    items={galleryItems}
                    viewAllText="Se gallerier"
                    align="center"
                    showIcons={false}
                    onHoverChange={setIsDropdownOpen}
                  >
                    Galleri
                  </DropdownMenu>
                  <DropdownMenu
                    href="/hvem-er-vi"
                    isActive={isHvemErViActive}
                    items={[
                      {
                        href: "/kontakt",
                        title: "Kontakt",
                        description:
                          "Få kontaktinformation og kom i kontakt med os",
                        isActive: isActive("/kontakt"),
                      },
                      {
                        href: "/download",
                        title: "Download",
                        description: "Download vores logo og andre materialer",
                        isActive: isActive("/download"),
                      },
                    ]}
                    viewAllText="Se hvem vi er"
                    align="center"
                    showIcons={false}
                    onHoverChange={setIsDropdownOpen}
                  >
                    Hvem er vi
                  </DropdownMenu>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Donation CTA */}
            <div
              ref={donationButtonRef}
              onMouseEnter={handleDonationHover}
              onMouseLeave={handleDonationLeave}
              className="hidden lg:block transform-gpu"
            >
              <Link href="/donation">
                <Button
                  variant="primary"
                  size="md"
                  className="font-bold font-adelle-sans"
                >
                  Støt nu{" "}
                  <div ref={arrowRef} className="inline-block">
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </div>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-vmh-dark-gray hover:text-vmh-gold transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation - Inside header for proper positioning */}
          <MobileNavigation
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            headerBackground={getHeaderBackground()}
          />
        </div>
      </header>

      {/* Spacer to prevent content jump when header becomes fixed */}
      <div className="h-16 lg:h-20" />

      {/* Blur Overlay */}
      <BlurOverlay isVisible={isDropdownOpen || isMobileMenuOpen} />
    </>
  );
}
