import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-dw.png";


const CAL_URL = "https://cal.com/tiago-barbosa-wiadtc/30min";

const links = [
  { hash: "sobre", label: "Sobre" },
  { hash: "pilar", label: "Oferta" },
  { hash: "ecossistema", label: "Ecossistema" },
  { hash: "metodo", label: "Método" },
  { hash: "cases", label: "Cases" },
  { hash: "equipa", label: "Equipa" },
];

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 rounded-full border border-border bg-background/60 backdrop-blur-xl px-4 sm:px-5 py-2.5 sm:py-3">
        <Link to="/" hash="top" className="flex items-center gap-2.5 shrink-0">
          <img
            src={logo}
            alt="Digital Wave"
            className="w-9 h-9 object-contain"
            style={{ filter: "invert(1) brightness(2)", mixBlendMode: "screen" }}
          />
          <div className="leading-none">
            <div className="text-sm font-semibold tracking-tight">Digital Wave</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hidden sm:block">B2B · Email</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link key={l.hash} to="/" hash={l.hash} className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-3 sm:!px-4 !text-xs sm:!text-sm shrink-0">
          <span className="hidden sm:inline">Agendar uma reunião</span>
          <span className="sm:hidden">Agendar</span>
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
