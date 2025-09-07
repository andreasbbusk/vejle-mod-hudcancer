"use client";
import { cn } from "@/modules/lib/utils";
import { motion, SpringOptions, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
  locale = "en-US",
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(
    as as keyof React.JSX.IntrinsicElements
  );

  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    current.toLocaleString(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    })
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <MotionComponent className={cn("tabular-nums", className)}>
      {display}
    </MotionComponent>
  );
}
