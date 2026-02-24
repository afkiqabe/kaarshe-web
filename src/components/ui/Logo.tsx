import Link from "next/link";
import { Icon } from "./Icon";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  showIcon?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({
  variant = "dark",
  showIcon = true,
  className,
  iconClassName,
  textClassName,
}: LogoProps) {
  const isDark = variant === "dark";
  const logoImage = siteConfig.logo.image;
  const mobileText = siteConfig.logo.text.toUpperCase();
  const desktopText = siteConfig.logo.text.startsWith("K")
    ? siteConfig.logo.text.slice(1)
    : siteConfig.logo.text;

  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      {showIcon && (
        <span
          className={cn("hidden md:inline-flex items-center", iconClassName)}
        >
          {logoImage?.src ? (
            <Image
              src={logoImage.src}
              alt={logoImage.alt ?? siteConfig.logo.text}
              width={32}
              height={32}
              priority
              className="h-8 w-8 object-contain"
            />
          ) : (
            <Icon
              name={siteConfig.logo.icon}
              className={cn(isDark ? "text-white" : "text-primary")}
              size="sm"
            />
          )}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-2xl font-black tracking-tighter leading-none",
          "text-accent-gold",
          textClassName,
        )}
      >
        <span className="md:hidden">{mobileText}</span>
        <span className="hidden md:inline">{desktopText}</span>
      </h2>
    </Link>
  );
}
