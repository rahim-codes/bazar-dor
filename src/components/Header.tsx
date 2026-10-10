import BanglaDate from "@/components/BanglaDate";
import NavLinks from "@/components/NavLinks";
import PriceTicker from "@/components/PriceTicker";
import UserInfo from "@/components/UserInfo";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo-icon.png";

export default function Header() {
  // Dynamic Bangla Date
  //   const formattedDate = new Intl.DateTimeFormat("bn-BD", {
  //     weekday: "long",
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   }).format(new Date());

  return (
    <header className="w-full bg-base-100 border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-2">
        {/* Left Side: Custom Logo Image + Title + Date */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center p-1.5 shadow-sm group-hover:bg-emerald-800 transition-colors">
            <Image
              src={logo}
              alt="Bazar Dor Logo"
              width={28}
              height={28}
              className="object-contain filter brightness-0 invert" // Keeps icon white on emerald background
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-base-content leading-tight">
              বাজার দর
            </span>
            <span className="text-xs text-base-content/60 font-medium">
              <BanglaDate />
            </span>
          </div>
        </Link>

        {/* Right Side: Auth Buttons */}
        <UserInfo />
      </div>
      <NavLinks />
      <PriceTicker />
    </header>
  );
}
