import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/modules/components/ui/separator";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-vmh-dark-gray text-white ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-center">
          {/* Logo Section */}
          <div className="">
              <Image
                src="/footer-logo.svg"
                alt="Vejle mod Hudcancer"
                width={256}
                height={256}
                className=""
              />
          </div>

          {/* Contact Information */}
          <div className="space-y-6 flex flex-col justify-center">
            {/* Email */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-8 flex-shrink-0">
                <Image
                  src="/mail-icon.svg"
                  alt="Email"
                  width={47}
                  height={29}
                  className="w-full h-full"
                />
              </div>
              <span className="text-white text-lg font-medium">
                kontakt@vejlemodhudcancer.dk
              </span>
            </div>
            <Separator className="bg-vmh-gold" />

            {/* Address */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-7 h-12 flex-shrink-0">
                <Image
                  src="/location.svg"
                  alt="Location"
                  width={26}
                  height={46}
                  className="w-full h-full"
                />
              </div>
              <span className="text-white text-lg font-medium">
                Torvegade 8D, 7100 Vejle, Denmark
              </span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center lg:items-end justify-center space-y-4">
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com/vejlemodhudcancer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-vmh-gold rounded-lg flex items-center justify-center hover:bg-vmh-gold-dark transition-colors"
                aria-label="Facebook"
              >
                <Image
                  src="/facebook.svg"
                  alt="Facebook"
                  width={28}
                  height={28}
                  className="w-10 h-10"
                />
              </Link>
              <Link
                href="https://instagram.com/vejlemodhudcancer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-vmh-gold rounded-lg flex items-center justify-center hover:bg-vmh-gold-dark transition-colors"
                aria-label="Instagram"
              >
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={28}
                  height={28}
                  className="w-8 h-8"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/company/vejle-mod-hudcancer/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-vmh-gold rounded-lg flex items-center justify-center hover:bg-vmh-gold-dark transition-colors"
                aria-label="LinkedIn"
              >
                <Image
                  src="/linkedin.svg"
                  alt="LinkedIn"
                  width={28}
                  height={28}
                  className="w-8 h-8"
                />
              </Link>
            </div>
            <Separator className="bg-vmh-gold" />
            <div className="text-center lg:text-right">
              <p className="text-gray-300 text-base font-medium">
                @vejlemodhudcancer
              </p>
              <p className="text-gray-300 text-base">Sociale medier</p>
            </div>
          </div>
        </div>

        {/* Separator and Copyright */}
        <div className="mt-12">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              COPYRIGHT © ALLE RETTIGHEDER FORBEHOLDES
            </p>
            <p className="text-gray-400 text-sm">
              INDSAMLINGEN KONTROLLERES AF ERNST & YOUNG, VEJLE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
