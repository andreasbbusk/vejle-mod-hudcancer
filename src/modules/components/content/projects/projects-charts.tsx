"use client";

import { motion } from "framer-motion";
import type { ProjectLandingChart } from "@/modules/types/sanity";
import { useIntersectionAnimation } from "@/modules/hooks/use-intersection-animation";

type ProjectsChartsProps = {
  charts: ProjectLandingChart[];
  className?: string;
};

type AnimatedBarProps = {
  chart: ProjectLandingChart;
  index: number;
  barWidthPercentage: number;
};

function AnimatedBar({ chart, index, barWidthPercentage }: AnimatedBarProps) {
  const { ref, hasTriggered } = useIntersectionAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Sequential delay for each bar
  const animationDelay = index * 0.4;
  const barDuration = 1.2;
  const textDelay = animationDelay + barDuration + 0.2;

  return (
    <div ref={ref} className="relative mb-8">
      <div className="flex items-center">
        {/* Animated Bar with integrated year and amount */}
        <div className="flex-1 relative">
          <div className="flex items-center relative">
            {/* Shadow/3D effect - skewed bar underneath */}
            <motion.div
              className="bg-[#e0a619] h-20 absolute rounded-r-full opacity-30 -z-10"
              initial={{ width: 0 }}
              animate={
                hasTriggered
                  ? { width: `${Math.max(barWidthPercentage, 30)}%` }
                  : { width: 0 }
              }
              transition={{
                duration: barDuration,
                delay: animationDelay + 0.1, // Slightly delayed for effect
                ease: "easeOut",
              }}
              style={{
                minWidth: hasTriggered ? "300px" : "0px",
                transform: "translateY(8px) skewX(-2deg)",
              }}
            />

            {/* Main bar */}
            <motion.div
              className="bg-[#e0a619] h-20 relative rounded-r-full overflow-hidden flex items-center justify-between px-6 z-10"
              initial={{ width: 0 }}
              animate={
                hasTriggered
                  ? { width: `${Math.max(barWidthPercentage, 30)}%` }
                  : { width: 0 }
              }
              transition={{
                duration: barDuration,
                delay: animationDelay,
                ease: "easeOut",
              }}
              style={{
                minWidth: hasTriggered ? "300px" : "0px",
              }}
            >
              {/* Year Label - Left side of bar */}
              <motion.div
                className="text-white font-bold text-xl lg:text-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  hasTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: 0.6,
                  delay: textDelay,
                  ease: "easeOut",
                }}
              >
                {chart.year}
              </motion.div>

              {/* Amount Label - Right side of bar */}
              <motion.div
                className="text-white font-bold text-lg lg:text-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={
                  hasTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{
                  duration: 0.6,
                  delay: textDelay,
                  ease: "easeOut",
                }}
              >
                {chart.amount.toLocaleString("da-DK")} kr.
              </motion.div>
            </motion.div>

            {/* Project Information - Right next to bar end */}
            <motion.div
              className="ml-6 space-y-1 max-w-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={
                hasTriggered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
              }
              transition={{
                duration: 0.8,
                delay: textDelay + 0.3,
                ease: "easeOut",
              }}
            >
              <h3 className="text-lg font-bold text-black leading-tight">
                {chart.overskrift}
              </h3>
              <p className="text-base text-black leading-snug">
                {chart.beskrivelse}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsCharts({
  charts,
  className,
}: ProjectsChartsProps) {
  // Calculate the maximum amount for scaling the bars
  const maxAmount = Math.max(...charts.map((chart) => chart.amount));

  // Sort data by year descending to match the design
  const sortedData = [...charts].sort(
    (a, b) => parseInt(b.year) - parseInt(a.year)
  );

  return (
    <section className={`py-16 bg-[#fbf5eb] ${className}`}>
      <div className="">
        {/* Charts */}
        <div className="w-full relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] space-y-6 mb-16">
          {sortedData.map((chart, index) => {
            // Calculate bar width as percentage of max amount
            const barWidthPercentage = (chart.amount / maxAmount) * 100;

            return (
              <AnimatedBar
                key={chart.year}
                chart={chart}
                index={index}
                barWidthPercentage={barWidthPercentage}
              />
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <p className="text-lg text-black max-w-2xl mx-auto">
            Har du et relevant hudcancer-projekt, som vi kan tage i betragtning,
            er du velkommen til at kontakte os på{" "}
            <a
              href="mailto:kontakt@vejlemodhudcancer.dk"
              className="text-black underline hover:text-[#e0a619] transition-colors"
            >
              kontakt@vejlemodhudcancer.dk
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
