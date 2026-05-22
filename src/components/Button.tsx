import { type ReactNode } from "react";

type Props = {
  variant?: "primary" | "secondary";
  size?: "default" | "small";
  href?: string;
  external?: boolean;
  children: ReactNode;
};

const base = "inline-flex items-center justify-center gap-2.5 rounded-full border font-bold uppercase transition-all duration-200 no-underline select-none";

const variants = {
  primary: "border-[#17FC13] bg-gradient-to-t from-[#17FC13]/20 to-transparent text-white hover:shadow-[0_0_20px_rgba(23,252,19,0.15)]",
  secondary: "border-[#404040] bg-gradient-to-t from-white/[0.06] to-transparent text-white hover:border-[#17FC13]/50",
};

const sizes = {
  default: "px-6 py-2.5 text-[13px] tracking-wide",
  small: "px-5 py-2 text-xs tracking-wide",
};

export function Button({ variant = "primary", size = "default", href, external, children }: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]}`;

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return <button className={cls}>{children}</button>;
}
