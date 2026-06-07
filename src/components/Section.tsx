type Props = {
  size?: "sm" | "md" | "lg";
  border?: "top" | "bottom" | "both" | "none";
  bg?: "default" | "radial";
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const PAD = {
  sm: "py-5 md:py-7",
  md: "py-7 md:py-9",
  lg: "py-9 md:py-12",
};

const BORDER = {
  top: "border-t border-[#171717]",
  bottom: "border-b border-[#171717]",
  both: "border-y border-[#171717]",
  none: "",
};

export function Section({ size = "md", border = "none", bg = "default", id, className = "", children }: Props) {
  return (
    <section
      id={id}
      className={`${PAD[size]} ${BORDER[border]} ${bg === "radial" ? "bg-radial" : ""} ${className}`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">{children}</div>
    </section>
  );
}
