export interface ProductCardProps {
  nameBn: string;
  unit: string;
  today: number;
  image?: string;
  change: Change;
}

interface Change {
  dir: string;
  pct: number;
}

// English to Bangla digit converter
const toBengaliNumber = (num: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

export default function ProductCard({
  product,
}: {
  product: ProductCardProps;
}) {
  const priceBn = toBengaliNumber(product.today);
  const pctBn = toBengaliNumber(product.change.pct.toFixed(1));
  const unitBn = product.unit === "kg" ? "কেজি" : product.unit;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <div className="w-full max-w-sm bg-[#f8faf8] border border-emerald-900/5 rounded-2xl p-4 shadow-2xs">
      {/* Top Row: Icon/Image + Name + Unit */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#edf3ed] rounded-2xl flex items-center justify-center text-2xl shrink-0">
          {product.image}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-base-content leading-tight">
            {product.nameBn}
          </h3>
          <span className="text-xs text-base-content/60 font-medium mt-0.5">
            প্রতি {unitBn}
          </span>
        </div>
      </div>

      {/* Bottom Row: Label + Price + Percentage Badge */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <span className="block text-xs text-base-content/60 font-medium">
            আজকের দাম
          </span>
          <div className="text-2xl font-extrabold text-base-content mt-0.5">
            {priceBn} <span className="text-base font-semibold">টাকা</span>
          </div>
        </div>

        {/* Change Percentage Badge */}
        {isUp && (
          <div className="bg-[#edf5ed] text-red-600 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            <span>▲</span>
            <span>{pctBn}%</span>
          </div>
        )}
        {isDown && (
          <div className="bg-[#edf5ed] text-emerald-600 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            <span>▼</span>
            <span>{pctBn}%</span>
          </div>
        )}
        {!isUp && !isDown && (
          <div className="bg-[#edf5ed] text-base-content/60 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            <span>━</span>
            <span>০.০%</span>
          </div>
        )}
      </div>
    </div>
  );
}
