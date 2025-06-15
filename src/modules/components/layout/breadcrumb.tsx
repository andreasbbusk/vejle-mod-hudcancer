import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/modules/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-1 text-sm text-muted-foreground",
        className
      )}
    >
      <Link
        href="/"
        className="hover:text-foreground transition-colors uppercase"
        aria-label="Gå til forsiden"
      >
        Hjem
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors uppercase"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium uppercase">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
