export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
      {/* daisyUI Emerald Loading Spinner */}
      <span className="loading loading-spinner loading-lg text-emerald-700"></span>
      <p className="text-sm font-semibold text-base-content/70 animate-pulse">
        তথ্য লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
      </p>
    </div>
  );
}
