import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Marquee {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

export const toBengaliNumber = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

const PriceTicker = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data: Marquee[] = await res.json();

  return (
    <div className="w-full bg-[#f8faf8] border-y border-emerald-950/5 py-2.5 mt-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <MarqueeText direction="right" duration={10} pauseOnHover={true}>
          <div className="flex items-center gap-8">
            {data.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-base-content/80 hover:text-emerald-700 transition-colors whitespace-nowrap px-2"
              >
                <span className="text-base">{p.image || "📦"}</span>
                <span className="font-semibold text-base-content">
                  {p.nameBn}
                </span>
                <span className="text-base-content/60">·</span>
                <span className="font-bold text-base-content">
                  {toBengaliNumber(p.today)} টাকা
                </span>
                <span className="text-base-content/60">
                  / {p.unit === "kg" ? "কেজি" : p.unit}
                </span>

                {p.change?.dir === "up" ? (
                  <span className="text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded-md inline-flex items-center gap-0.5 text-xs">
                    ▲ {toBengaliNumber(p.change.pct)}%
                  </span>
                ) : p.change?.dir === "down" ? (
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md inline-flex items-center gap-0.5 text-xs">
                    ▼ {toBengaliNumber(p.change.pct)}%
                  </span>
                ) : (
                  <span className="text-base-content/50 font-bold bg-base-200 px-1.5 py-0.5 rounded-md text-xs">
                    ━ ০.০%
                  </span>
                )}
              </Link>
            ))}
          </div>
        </MarqueeText>
      </div>
    </div>
  );
};

export default PriceTicker;
