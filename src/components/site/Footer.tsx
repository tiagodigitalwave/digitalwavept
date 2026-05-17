import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const CAL_URL = "https://cal.com/tiago-barbosa-wiadtc/30min";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-wave/20 border border-wave/40 grid place-items-center">
              <div className="w-3 h-3 rounded-full bg-wave" />
            </div>
            <span className="font-semibold">Digital Wave</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Engenharia de outbound por email para empresas B2B. Agendamos reuniões com
            os decisores que importam.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Contacto</div>
          <a href="mailto:hello@tiagodigitalwave.eu" className="block text-foreground hover:text-wave transition break-all">
            hello@tiagodigitalwave.eu
          </a>
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-wave transition mt-2">
            Agendar uma reunião →
          </a>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Navegação</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" hash="sobre" className="text-muted-foreground hover:text-foreground">Sobre</Link></li>
            <li><Link to="/" hash="ecossistema" className="text-muted-foreground hover:text-foreground">Como funciona</Link></li>
            <li><Link to="/" hash="cases" className="text-muted-foreground hover:text-foreground">Casos de estudo</Link></li>
            <li><Link to="/" hash="equipa" className="text-muted-foreground hover:text-foreground">Equipa</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Digital Wave. Todos os direitos reservados.</div>
          <div className="flex flex-wrap gap-5 justify-center">
            <Link to="/politica-de-privacidade" className="hover:text-foreground">Política de Privacidade</Link>
            <Link to="/termos" className="hover:text-foreground">Termos</Link>
            <Link to="/cookies" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("dw-cookies")) setShow(true);
  }, []);
  if (!show) return null;
  const decide = (v: "accept" | "reject") => {
    localStorage.setItem("dw-cookies", v);
    setShow(false);
  };
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl card-surface p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
      <p className="text-sm text-muted-foreground flex-1">
        Usamos cookies para melhorar a tua experiência, analisar tráfego e personalizar conteúdos.
        Podes aceitar todos ou recusar os opcionais. Vê a nossa{" "}
        <Link to="/cookies" className="text-wave underline">Política de Cookies</Link>.
      </p>
      <div className="flex gap-2 shrink-0 w-full md:w-auto">
        <button onClick={() => decide("reject")} className="btn-ghost !py-2 !px-4 !text-sm flex-1 md:flex-none justify-center">Recusar</button>
        <button onClick={() => decide("accept")} className="btn-primary !py-2 !px-4 !text-sm flex-1 md:flex-none justify-center">Aceitar</button>
      </div>
    </div>
  );
}
