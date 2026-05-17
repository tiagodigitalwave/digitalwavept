const CAL_URL = "https://cal.com/tiago-barbosa-wiadtc/30min";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#pilar", label: "Oferta" },
  { href: "#ecossistema", label: "Ecossistema" },
  { href: "#metodo", label: "Método" },
  { href: "#cases", label: "Cases" },
  { href: "#equipa", label: "Equipa" },
];

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between rounded-full border border-border bg-background/60 backdrop-blur-xl px-5 py-3">
        <a href="#top" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-wave/20 border border-wave/40 grid place-items-center">
            <div className="w-3 h-3 rounded-full bg-wave shadow-[0_0_12px_var(--color-wave)]" />
          </div>
          <div className="leading-none">
            <div className="text-sm font-semibold tracking-tight">Digital Wave</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">B2B · Email</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 !text-sm">
          Agendar uma reunião
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
