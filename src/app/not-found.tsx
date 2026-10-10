import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#f8faf8] border border-emerald-900/5 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xs">
        {/* 404 Icon / Badge */}
        <div className="w-20 h-20 bg-[#edf3ed] rounded-3xl mx-auto flex items-center justify-center text-3xl font-black text-emerald-700 shadow-xs">
          ৪০৪
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
            পৃষ্ঠাটি পাওয়া যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60 font-medium leading-relaxed">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা সরিয়ে ফেলা হয়েছে অথবা এটি অস্তিত্বহীন।
          </p>
        </div>

        {/* Home Navigation Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-emerald-700/20 transition-colors"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
