import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`site-nav ${scrolled || open ? "site-nav-solid" : ""}`}>
      <div className="nav-inner">
        <Link to="/" hash="top" onClick={() => setOpen(false)} className="site-brand" aria-label="Digital Wave, início">
          <img src={logo} alt="" className="brand-symbol" width={40} height={40} />
          <span>digital wave<span className="text-primary">.</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm" aria-label="Navegação principal">
          <Link to="/" hash="pilar">O que fazemos</Link>
          <Link to="/" hash="cases">Resultados</Link>
          <Link to="/" hash="equipa">Sobre nós</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="link" className="nav-contact hidden sm:inline-flex">
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer">Vamos conversar <ArrowUpRight /></a>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação móvel">
        {links.map((link) => <Link key={link.hash} to="/" hash={link.hash} onClick={() => setOpen(false)}>{link.label} <ArrowUpRight size={22} /></Link>)}
        <Link to="/quiz" onClick={() => setOpen(false)}>Diagnóstico <ArrowUpRight size={22} /></Link>
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="text-primary">Agendar uma reunião <ArrowUpRight size={22} /></a>
      </nav>}
    </header>
  );
}
