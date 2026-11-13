import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-dw.png";
import { useI18n, LangSwitch } from "@/lib/i18n";
import { BookButton } from "./Booking";

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <img src={logo} alt="Digital Wave" width={36} height={36} className="w-9 h-9 object-contain" style={{ filter: "invert(1) brightness(2)", mixBlendMode: "screen" }} />
      <span className="font-bold text-ink-foreground whitespace-nowrap">Digital Wave</span>
    </span>
  );
}

export function Nav() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const links = [
    ["processo", t.nav.process], ["guia", t.nav.guide], ["calculadora", t.nav.calc], ["casos", t.nav.cases],
    ["sobre", t.nav.about], ["perguntas", t.nav.faq], ["contacto", t.nav.contact],
  ] as const;
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ink text-ink-foreground border-b border-ink-foreground/10">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 h-[72px] flex items-center justify-between gap-4">
        <Link to="/" hash="top" aria-label="Digital Wave"><Logo /></Link>
        <nav className="hidden xl:flex items-center gap-5 text-[15px]" aria-label="Principal">
          {links.map(([h, l]) => (
            <Link key={h} to="/" hash={h} className="text-ink-foreground/85 hover:text-ink-foreground">{l}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:block"><LangSwitch /></span>
          <BookButton className="btn-primary !py-2 !px-3 sm:!px-4 !text-sm whitespace-nowrap" />
          <button type="button" className="xl:hidden p-2" aria-label={t.nav.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="xl:hidden border-t border-ink-foreground/10 px-4 pb-4" aria-label="Menu">
          {links.map(([h, l]) => (
            <Link key={h} to="/" hash={h} onClick={() => setOpen(false)} className="block py-3 border-b border-ink-foreground/10">{l}</Link>
          ))}
          <div className="mt-4 sm:hidden"><LangSwitch /></div>
        </nav>
      )}
    </header>
  );
}
