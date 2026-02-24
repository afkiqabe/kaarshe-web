import { cn } from "@/lib/utils/cn";

interface IconProps {
  name: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fill?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
}

const sizes = {
  xs: "text-base",
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
  if (name === "arrow_right_alt") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
      </svg>
    );
  }

  if (name === "calendar_today") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v15a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2h4V2zm14 8H3v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V10zM3 8h18V6H3v2z" />
      </svg>
    );
  }

  if (name === "schedule") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 5h-2v6l5.2 3.1 1-1.65-4.2-2.45V7z" />
      </svg>
    );
  }

  if (name === "check_circle") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm-1.2 14.2L6.6 12l1.4-1.4 2.8 2.8 5.6-5.6L17.8 9l-7 7.2z" />
      </svg>
    );
  }

  if (name === "share") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M18 16a3 3 0 0 0-2.39 1.2L8.9 13.7a3.2 3.2 0 0 0 0-3.4l6.7-3.5A3 3 0 1 0 15 5a3 3 0 0 0 .09.7L8.4 9.2a3 3 0 1 0 0 5.6l6.69 3.5A3 3 0 1 0 18 16z" />
      </svg>
    );
  }

  if (name === "link") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 0 0 0 6h3v2h-3a5 5 0 0 1-5-5zm7-1h3v2h-3v-2zm4.2-4h3a5 5 0 0 1 0 10h-3v-2h3a3 3 0 0 0 0-6h-3V7z" />
      </svg>
    );
  }

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

  if (name === "facebook") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.028 1.792-4.699 4.533-4.699 1.312 0 2.686.236 2.686.236v2.972h-1.513c-1.49 0-1.953.93-1.953 1.887v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn("inline-block", sizes[size], className)}
        style={{ width: "1em", height: "1em" }}
      >
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
        <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        <path d="M17.5 6.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
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
