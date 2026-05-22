type Props = {
  children: string;
  accent: string;
  label?: string;
  center?: boolean;
};

export function SectionHeading({ children, accent, label, center }: Props) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}>
      {label && (
        <div className={`text-[10px] font-bold uppercase tracking-[0.3em] text-[#17FC13]/60 mb-4 ${center ? "text-center" : ""}`}>
          {label}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl uppercase font-bold leading-tight">
        {children} <span className="accent-text">{accent}</span>
      </h2>
    </div>
  );
}
