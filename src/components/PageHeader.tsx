import { Button } from "./Button";

type BreadcrumbItem = { label: string; href: string };

type Props = {
  title: string;
  accent?: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: { label: string; href: string; variant?: "primary" | "secondary" }[];
};

export function PageHeader({ title, accent, subtitle, breadcrumb, actions }: Props) {
  return (
    <div className="pt-24 md:pt-32 pb-4 md:pb-6">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[10px] font-medium uppercase tracking-[0.2em]">
          <a href="/" className="text-white/25 no-underline hover:text-white/50 transition-colors">Home</a>
          {breadcrumb?.map((b) => (
            <span key={b.href} className="flex items-center gap-2">
              <span className="text-white/10">/</span>
              <a href={b.href} className="text-white/25 no-underline hover:text-white/50 transition-colors">{b.label}</a>
            </span>
          ))}
          <span className="text-white/10">/</span>
          <span className="text-[#17FC13]/60">{accent || title}</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold leading-[0.9] mb-5">
          {accent ? <>{title} <span className="accent-text">{accent}</span></> : <span className="accent-text">{title}</span>}
        </h1>

        {subtitle && (
          <p className="text-base md:text-lg text-white/35 leading-relaxed max-w-2xl mb-8">{subtitle}</p>
        )}

        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {actions.map(a => (
              <Button key={a.label} href={a.href} variant={a.variant || "secondary"} size="small">{a.label}</Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
