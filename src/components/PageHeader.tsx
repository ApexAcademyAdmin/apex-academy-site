type Props = {
  title: string;
  accent: string;
  subtitle?: string;
};

export function PageHeader({ title, accent, subtitle }: Props) {
  return (
    <div className="pt-32 md:pt-40 pb-16 md:pb-20">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[10px] font-medium uppercase tracking-[0.2em]">
          <a href="/" className="text-white/25 no-underline hover:text-white/50 transition-colors">Home</a>
          <span className="text-white/10">/</span>
          <span className="text-[#17FC13]/60">{accent}</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold leading-[0.9] mb-6">
          {title} <span className="accent-text">{accent}</span>
        </h1>

        {subtitle && (
          <p className="text-[15px] text-white/40 leading-[1.8] max-w-xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
