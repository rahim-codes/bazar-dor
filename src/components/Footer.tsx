export default function Footer() {
  return (
    <footer className="w-full bg-[#f8faf8] border-t border-base-200 py-10 text-xs sm:text-sm text-base-content/70 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        {/* Left Side Text */}
        <p className="font-medium">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Side Disclaimer */}
        <p className="text-base-content/60">
          সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
