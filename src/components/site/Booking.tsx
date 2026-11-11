import { createContext, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/content";

const Ctx = createContext<() => void>(() => {});
export const useBooking = () => useContext(Ctx);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  return (
    <Ctx.Provider value={() => setOpen(true)}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl w-[calc(100%-2rem)] p-0 overflow-hidden bg-background text-foreground">
          <div className="p-5 border-b border-border">
            <DialogTitle className="text-xl font-bold">{t.modal.title}</DialogTitle>
            <DialogDescription className="sr-only">Cal.com</DialogDescription>
          </div>
          {open && (
            <iframe
              src={`${CONTACT.cal}?embed=true&theme=light`}
              title={t.modal.title}
              className="w-full h-[65vh] min-h-[420px] border-0"
              loading="lazy"
            />
          )}
          <div className="p-4 border-t border-border flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>{t.modal.fallback}</span>
            <a href={CONTACT.cal} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 !text-sm">
              {t.modal.open}
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

export function BookButton({ className = "btn-primary", children }: { className?: string; children?: ReactNode }) {
  const open = useBooking();
  const { t } = useI18n();
  return (
    <button type="button" onClick={open} className={className}>
      {children ?? t.nav.book}
    </button>
  );
}
