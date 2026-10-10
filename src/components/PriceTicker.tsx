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
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data: Marquee[] = await res.json();

  return (
    <div className="border p-1 mt-5 border-gray-300">
      <div className="max-w-7xl mx-auto">
        <MarqueeText direction={"right"} duration={10}>
          {data.map((p) => (
            <span key={p.id} className="mr-5">
              <span className="mr-2">{p.image}</span>
              <span className="mr-2">{p.nameBn}</span>

              <span className="mr-2">{toBengaliNumber(p.today)}টাকা</span>
              <span className="mr-2">/কেজি</span>

              {p.change.dir === "up" ? (
                <span className="text-green-500">
                  ▲ {toBengaliNumber(p.change.pct)}%
                </span>
              ) : (
                <span className="text-red-600">
                  ▼ {toBengaliNumber(p.change.pct)}%{" "}
                </span>
              )}
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default PriceTicker;
