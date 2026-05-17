import { useEffect, useState } from "react";

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
          <a href="mailto:hello@tiagodigitalwave.eu" className="block text-foreground hover:text-wave transition">
            hello@tiagodigitalwave.eu
          </a>
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-wave transition mt-2">
            Agendar uma reunião →
          </a>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Navegação</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#sobre" className="text-muted-foreground hover:text-foreground">Sobre</a></li>
            <li><a href="#ecossistema" className="text-muted-foreground hover:text-foreground">Como funciona</a></li>
            <li><a href="#cases" className="text-muted-foreground hover:text-foreground">Casos de estudo</a></li>
            <li><a href="#equipa" className="text-muted-foreground hover:text-foreground">Equipa</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Digital Wave. Todos os direitos reservados.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Política de Privacidade</a>
            <a href="#" className="hover:text-foreground">Termos</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
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
        Podes aceitar todos ou recusar os opcionais. Vê a nossa <a href="#" className="text-wave underline">Política de Cookies</a>.
      </p>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => decide("reject")} className="btn-ghost !py-2 !px-4 !text-sm">Recusar</button>
        <button onClick={() => decide("accept")} className="btn-primary !py-2 !px-4 !text-sm">Aceitar</button>
      </div>
    </div>
  );
}
