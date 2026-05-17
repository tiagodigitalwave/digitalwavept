import bolt from "@/assets/logos/bolt.png";
import ontime from "@/assets/logos/ontime.png";
import salvador from "@/assets/logos/salvador-caetano.png";
import arquimea from "@/assets/logos/arquimea.png";
import mcdonalds from "@/assets/logos/mcdonalds.png";
import hipay from "@/assets/logos/hipay.png";

const logos = [
  { name: "Bolt", src: bolt },
  { name: "Ontime", src: ontime },
  { name: "Grupo Salvador Caetano", src: salvador },
  { name: "ARQUIMEA", src: arquimea },
  { name: "McDonald's", src: mcdonalds },
  { name: "HiPay", src: hipay },
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
            key={`${logo.name}-${i}`}
            src={logo.src}
            alt={logo.name}
            loading="lazy"
            className={`${h} w-auto shrink-0 object-contain opacity-90 hover:opacity-100 transition`}
          />
        ))}
      </div>
    </div>
  );
}
