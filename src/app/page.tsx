import Hero from "@/components/Hero";
import PriceTicker from "@/components/PriceTicker";
import ProductUpDwon from "@/components/ProductUpDwon";

export default function Home() {
  return (
    <div>
      <PriceTicker />
      <Hero />
      <ProductUpDwon />
    </div>
  );
}
