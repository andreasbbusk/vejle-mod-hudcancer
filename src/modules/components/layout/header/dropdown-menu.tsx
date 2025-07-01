"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/modules/components/ui/navigation-menu";
import { Separator } from "@/modules/components/ui/separator";
import { cn } from "@/modules/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface DropdownMenuProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  items: PreviewItem[];
  viewAllText?: string;
  className?: string;
  showIcons?: boolean;
  align?: "start" | "center" | "end";
  onHoverChange?: (isOpen: boolean) => void;
}

interface PreviewItem {
  href: string;
  title: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  isSubItem?: boolean; // For indented sub-items
  addSeparator?: boolean; // Add separator after this item
}

export default function DropdownMenu({
  href,
  children,
  isActive,
  items,
  viewAllText = "Se alle",
  className,
  showIcons = true,
  align = "start",
  onHoverChange,
}: DropdownMenuProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  const handleMouseEnter = () => {
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    onHoverChange?.(false);
  };

  return (
    <NavigationMenuItem
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavigationMenuTrigger
        onClick={handleClick}
        className={cn(
          "font-medium tracking-wide text-sm py-2 px-1 relative bg-transparent hover:bg-transparent data-[state=open]:bg-transparent cursor-pointer",
          isActive ? "text-vmh-gold" : "text-vmh-dark-gray hover:text-vmh-gold"
        )}
      >
        {children}
      </NavigationMenuTrigger>
      <NavigationMenuContent
        className={cn(
          align === "center" && "left-1/2 -translate-x-1/2",
          align === "end" && "left-auto right-0"
        )}
      >
        <div className="w-[500px] p-4">
          {/* Header with "View All" link */}
          <div className="flex items-center justify-between mb-4 pb-2">
            <h3 className="font-semibold text-vmh-dark-gray">{children}</h3>
            <NavigationMenuLink asChild>
              <Link
                href={href}
                className="text-sm text-vmh-gold hover:text-vmh-gold/80 font-medium transition-colors flex items-center flex-row gap-2"
              >
                {viewAllText} <ArrowUpRight className="w-4 h-4 text-vmh-gold" />
              </Link>
            </NavigationMenuLink>
          </div>
          <Separator className="mb-4" />

          {/* Preview Items List */}
          {items.length > 0 ? (
            <div className="space-y-1">
              {items.slice(0, 6).map((item, index) => (
                <div key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-3 px-0 rounded-lg transition-all duration-200 group",
                        item.isActive ? "text-vmh-gold" : ""
                      )}
                    >
                      <div className={cn("flex", showIcons ? "gap-3" : "")}>
                        {/* Image placeholder or actual image */}
                        {showIcons && (
                          <div className="flex-shrink-0">
                            {item.image ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-vmh-gold/20 to-vmh-gold/10 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-vmh-gold/20" />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h4
                            className={cn(
                              "font-medium leading-tight line-clamp-2 mb-1 transition-colors text-sm hover:text-vmh-gold",
                              item.isActive
                                ? "text-vmh-gold"
                                : "text-vmh-dark-gray"
                            )}
                          >
                            {item.title}
                          </h4>

                          {/* Description */}
                          {item.description && (
                            <p className="text-gray-600 line-clamp-2 text-xs">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  {/* Separator */}
                  {item.addSeparator && index < items.length - 1 && (
                    <Separator className="my-3" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Ingen elementer tilgængelige</p>
            </div>
          )}

          {/* Show more indicator if there are more items */}
          {items.length > 4 && (
            <>
              <Separator className="mt-4" />
              <div className="pt-3 text-center">
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className="text-sm text-vmh-gold hover:text-vmh-gold/80 font-medium transition-colors"
                  >
                    +{items.length - 4} flere {viewAllText.toLowerCase()}
                  </Link>
                </NavigationMenuLink>
              </div>
            </>
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
