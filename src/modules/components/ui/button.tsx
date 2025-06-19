import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md";

  const variants = {
    primary:
      "bg-vmh-gold hover:bg-vmh-gold-dark text-white focus:ring-vmh-gold/50 rounded-bl-none rounded-tr-none",
    secondary:
      "bg-vmh-dark-gray hover:bg-vmh-dark-gray-darker text-vmh-white focus:ring-vmh-dark-gray/50",
    outline:
      "border border-vmh-gold text-vmh-gold hover:bg-vmh-light-cream focus:ring-vmh-gold/50",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base shadow-sm",
    lg: "px-6 py-2 text-base shadow-md",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
