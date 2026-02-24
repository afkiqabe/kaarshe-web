import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  background?: "white" | "gray" | "primary" | "secondary";
}

const sizes = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
};

const backgrounds = {
  white: "bg-white",
  gray: "bg-gray-50",
  primary: "bg-primary-50",
  secondary: "bg-secondary-50",
};

export function Section({
  children,
  id,
  className,
  containerClassName,
  size = "md",
  background = "white",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(backgrounds[background], sizes[size], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
