type Props = {
  size?: "sm" | "md" | "lg";
  border?: "top" | "bottom" | "both" | "none";
  bg?: "default" | "radial";
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const PAD = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-28 md:py-36",
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
      <div className="max-w-[1120px] mx-auto px-6">{children}</div>
    </section>
  );
}
