import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n, LangSwitch } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";
import { Logo } from "./Nav";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer id="contacto" className="bg-ink text-ink-foreground scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-ink-foreground/75 max-w-xs">{t.footer.tagline}</p>
          <LangSwitch className="mt-5" />
        </div>
        <div className="text-sm space-y-2">
          <div className="font-semibold mb-3">{t.footer.contact}</div>
          <a href={`mailto:${CONTACT.email}`} className="block hover:underline break-all">{CONTACT.email}</a>
          <a href={CONTACT.phoneHref} className="block hover:underline">{CONTACT.phoneDisplay}</a>
          <div className="text-ink-foreground/75">{t.footer.address}: {CONTACT.address}</div>
        </div>
        <div className="text-sm space-y-2">
          <div className="font-semibold mb-3">{t.footer.follow}</div>
          {/* [A PREENCHER] LinkedIn da empresa */}
          {CONTACT.linkedinCompany ? (
            <a href={CONTACT.linkedinCompany} target="_blank" rel="noopener noreferrer" className="block hover:underline">LinkedIn</a>
          ) : (
            <span className="block text-ink-foreground/60">LinkedIn [A PREENCHER]</span>
          )}
          <a href={CONTACT.youtubeChannel} target="_blank" rel="noopener noreferrer" className="block hover:underline">YouTube</a>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row gap-3 justify-between text-xs text-ink-foreground/70">
          <span>{t.footer.rights}</span>
          <div className="flex flex-wrap gap-5">
            <Link to="/politica-de-privacidade" className="hover:text-ink-foreground">{t.footer.privacy}</Link>
            <Link to="/termos" className="hover:text-ink-foreground">{t.footer.terms}</Link>
            <Link to="/cookies" className="hover:text-ink-foreground">{t.footer.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("dw-cookies")) setShow(true);
  }, []);
  if (!show) return null;
  const decide = (v: "accept" | "reject") => {
    localStorage.setItem("dw-cookies", v);
    setShow(false);
  };
  return (
    <div role="dialog" aria-label="Cookies" className="fixed bottom-4 inset-x-4 z-40 mx-auto max-w-3xl rounded-xl bg-ink text-ink-foreground shadow-lg p-5 flex flex-col md:flex-row md:items-center gap-4">
      <p className="text-sm flex-1">
        {t.cookie.text} <Link to="/politica-de-privacidade" className="underline">{t.cookie.link}</Link>.
      </p>
      <div className="flex gap-2">
        <button onClick={() => decide("reject")} className="btn-outline-light !py-2 !px-4 !text-sm flex-1">{t.cookie.reject}</button>
        <button onClick={() => decide("accept")} className="btn-primary !py-2 !px-4 !text-sm flex-1">{t.cookie.accept}</button>
      </div>
    </div>
  );
}
