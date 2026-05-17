const logos = [
  { name: "Bolt", domain: "bolt.eu" },
  { name: "Ontime", domain: "ontime.pt" },
  { name: "Grupo Salvador Caetano", domain: "salvadorcaetano.com" },
  { name: "ARQUIMEA", domain: "arquimea.com" },
  { name: "McDonald's", domain: "mcdonalds.com" },
  { name: "HiPay", domain: "hipay.com" },
];

export function LogoMarquee({ size = "md" }: { size?: "md" | "lg" }) {
  const items = [...logos, ...logos, ...logos];
  const h = size === "lg" ? "h-12 md:h-16" : "h-8 md:h-10";
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10" />
      <div className={`flex items-center gap-10 md:gap-20 ${size === "lg" ? "marquee-track-slow" : "marquee-track"} whitespace-nowrap`}>
        {items.map((logo, i) => (
          <img
            key={`${logo.domain}-${i}`}
            src={`https://logo.clearbit.com/${logo.domain}`}
            alt={logo.name}
            loading="lazy"
            className={`${h} w-auto shrink-0 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition`}
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = "none";
              const fb = t.nextElementSibling as HTMLElement | null;
              if (fb) fb.style.display = "inline-block";
            }}
          />
        ))}
      </div>
    </div>
  );
}
