const logos = ["Bolt", "Ontime", "Grupo Salvador Caetano", "ARQUIMEA", "McDonald's"];

export function LogoMarquee({ size = "md" }: { size?: "md" | "lg" }) {
  const items = [...logos, ...logos, ...logos];
  const textSize = size === "lg" ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl";
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className={`flex gap-16 ${size === "lg" ? "marquee-track-slow" : "marquee-track"} whitespace-nowrap`}>
        {items.map((logo, i) => (
          <span
            key={i}
            className={`font-display ${textSize} text-muted-foreground/70 tracking-tight shrink-0`}
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
