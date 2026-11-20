import { Link } from "@tanstack/react-router";
import { legalEnglish } from "@/lib/content";
import { Button } from "@/components/ui/button";

export function EnglishLegal({ page, onReset }: { page: keyof typeof legalEnglish; onReset?: () => void }) {
  const content = legalEnglish[page];
  return <>
    <span className="eyebrow">Legal</span>
    <h1 className="display mt-6">{content.title}</h1>
    <p className="mt-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB")}</p>
    <div className="mt-12 space-y-8 max-w-3xl text-foreground/90 leading-relaxed">
      {content.sections.map(([title, text]) => <section key={title}>
        <h2 className="text-2xl mb-3">{title}</h2>
        <p>{text}</p>
        {onReset && title.startsWith("4.") && <Button variant="ghost" onClick={onReset} className="btn-ghost mt-4">Reset cookie preferences</Button>}
      </section>)}
      <Link to="/" className="underline">Back to home</Link>
    </div>
  </>;
}
