import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Lang } from "./content";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof dict)["pt"] };
const I18n = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => {
    const saved = localStorage.getItem("dw-lang");
    if (saved === "en" || saved === "pt") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
    document.title = dict[lang].meta.title;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("dw-lang", l);
  };
  return <I18n.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</I18n.Provider>;
}

export function useI18n() {
  const c = useContext(I18n);
  if (!c) throw new Error("useI18n outside provider");
  return c;
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`inline-flex rounded-md border border-ink-foreground/30 p-0.5 text-xs font-semibold ${className}`} role="group" aria-label="Idioma / Language">
      {(["pt", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2 py-1 rounded uppercase ${lang === l ? "bg-ink-foreground text-ink" : "text-ink-foreground"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
