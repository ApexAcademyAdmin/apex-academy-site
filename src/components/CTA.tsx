"use client";

export function CTA() {
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#070707]" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6EFF00]/[0.04] blur-[120px]" />

      {/* Angular lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6EFF00]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6EFF00]/15 to-transparent" />

      <div className="relative max-w-[800px] mx-auto px-6 text-center">
        <div className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#6EFF00] mb-6">Join The Program</div>
        <h2 className="text-[36px] md:text-[56px] lg:text-[68px] font-black uppercase tracking-tight leading-[0.9] text-white mb-6">
          Ready To<br /><span className="text-[#6EFF00]">Compete?</span>
        </h2>
        <p className="text-[16px] text-white/60 leading-[1.7] max-w-[500px] mx-auto mb-10">
          Tryouts, training, and travel teams. Whatever your level, Apex Academy has a path for you. The only question is whether you are ready to commit to the standard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="mailto:apexsportsgg@gmail.com" className="px-10 py-4 bg-[#6EFF00] text-black text-[13px] font-bold uppercase tracking-wider rounded-lg no-underline hover:shadow-[0_0_30px_rgba(110,255,0,0.3)] transition">
            Contact Us
          </a>
          <a href="https://www.instagram.com/apexacademyofficial" target="_blank" rel="noopener noreferrer"
            className="px-10 py-4 border border-white/20 text-white text-[13px] font-bold uppercase tracking-wider rounded-lg no-underline hover:border-[#6EFF00]/40 hover:text-[#6EFF00] transition">
            Follow @ApexAcademy
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[12px] text-white/40">
          <span>apexsportsgg@gmail.com</span>
          <span className="hidden sm:block">·</span>
          <span>Massachusetts</span>
        </div>
      </div>
    </section>
  );
}
