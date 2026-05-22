type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Card({ children, className = "", id }: Props) {
  return (
    <div id={id} className={`border border-[#171717] bg-radial p-8 md:p-10 lg:p-12 transition-all duration-300 hover:border-[#17FC13]/30 group ${className}`}>
      {children}
    </div>
  );
}
