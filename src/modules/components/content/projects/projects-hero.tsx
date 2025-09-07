"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatedNumber } from "@/modules/components/ui/motion-primitives/animated-number";

type ProjectsHeroProps = {
  totalAmount: number;
  className?: string;
};

export default function ProjectsHero({
  totalAmount,
  className,
}: ProjectsHeroProps) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: "0px 0px -100px 0px", // Trigger a bit before fully in view
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);
  return (
    <section className={`relative py-8 md:py-16 ${className}`}>
      <div>
        {/* Top section with text and logo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 items-start mb-6 md:mb-8">
          {/* Left side - Text content (2/3 width) */}
          <div className="lg:col-span-2 space-y-4 md:space-y-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-adelle text-black uppercase tracking-wide leading-tight">
              <strong>VEJLE MOD HUDCANCER</strong> STØTTER HVERT ANDET ÅR ET NYT
              LOKALT HUDCANCER-PROJEKT
            </h1>

            <div className="h-[1.5px] rounded-full w-48 sm:w-64 md:w-80 bg-vmh-gold"></div>

            <div className="space-y-2 max-w-2xl">
              <p className="text-base md:text-lg leading-relaxed">
                Styregruppen udvælger hvert andet år et nyt projekt, som støttes
                med de midler, der indsamles gennem donationer fra borgere og
                det lokale erhvervsliv.
              </p>
              <p className="text-base md:text-lg font-semibold">
                Alle indsamlede midler fra året går ubeskåret til projektet.
              </p>
            </div>
          </div>

          {/* Right side - Logo (1/3 width) */}
          <div className="hidden md:flex flex-col lg:items-end mt-4 lg:mt-0">
            <div className="flex items-center">
              <Image
                src="/icons/vmh-money-stack.svg"
                alt="VMH Money Stack Logo"
                width={155}
                height={155}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
              />
            </div>
          </div>
        </div>

        {/* Bottom section - Total amount spanning full width */}
        <div ref={ref} className="max-w-4xl ml-auto">
          <div className="text-4xl sm:text-5xl md:text-6xl text-center sm:text-right lg:text-8xl font-bold text-[#e0a619] tracking-wide mb-2 md:mb-4">
            <AnimatedNumber
              value={isInView ? totalAmount : 0}
              className="tabular-nums"
              locale="da-DK"
              minimumFractionDigits={2}
              maximumFractionDigits={2}
              springOptions={{
                duration: 3000,
                bounce: 0,
                damping: 25,
                stiffness: 100,
              }}
            />{" "}
            kr.
          </div>
          <p className="max-w-xs text-base md:text-lg text-black text-center sm:text-right md:max-w-xl ml-auto px-4 sm:px-0">
            Vejle mod hudcancer har siden 2017 indsamlet kr.{" "}
            {totalAmount.toLocaleString("da-DK", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            , som er gået til en lang række formål.
          </p>
        </div>
      </div>
    </section>
  );
}
