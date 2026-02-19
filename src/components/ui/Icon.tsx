import { cn } from "@/lib/utils/cn";

interface IconProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fill?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
}

const sizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function Icon({
  name,
  className,
  size = "md",
  fill = false,
  weight = 400,
}: IconProps) {
  if (name === "x") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }

  return (
    <span
      className={cn("material-symbols-outlined", sizes[size], className)}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
      }}
    >
      {name}
    </span>
  );
}
