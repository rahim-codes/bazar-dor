import BanglaDate from "@/components/BanglaDate";
import Image from "next/image";
import Link from "next/link";
import hero from "../../public/bazar-hero.png";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full bg-[#f6f9f6] rounded-3xl p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-900/5 shadow-2xs">
        {/* Left Content */}
        <div className="flex-1 space-y-4 text-left">
          {/* Date Badge */}
          <div className="inline-block bg-emerald-100/70 text-emerald-800 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full">
            <BanglaDate />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base text-base-content/70 max-w-xl leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Call to Action Button */}
          <div className="pt-2">
            <Link
              href="#products"
              className="btn bg-emerald-700 hover:bg-emerald-800 text-white font-medium border-none rounded-xl px-6 shadow-md shadow-emerald-700/20"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Illustration/Image */}
        <div className="shrink-0 w-48 sm:w-64 lg:w-80 flex justify-center items-center">
          <Image
            src={hero}
            alt="বাজারের ফলের ঝুড়ি"
            width={320}
            height={320}
            priority
            className="object-contain w-full h-auto drop-shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
