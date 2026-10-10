"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল হয়েছে!");
            router.push("/signin");
          },
        },
      });
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  // Loading state skeleton
  if (isPending) {
    return (
      <div className="w-24 h-9 bg-base-200 animate-pulse rounded-xl"></div>
    );
  }

  // 1. Logged In User State
  if (user) {
    const displayName = user.name || "User";
    const firstName = displayName.split(" ")[0];

    return (
      <div className="dropdown dropdown-end">
        {/* Trigger Button: User Avatar + Name */}
        <label
          tabIndex={0}
          className="btn btn-ghost btn-sm h-auto py-1 px-2 gap-2 normal-case font-medium hover:bg-base-200/60 rounded-xl cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-emerald-100 relative shrink-0 flex items-center justify-center border border-emerald-900/10">
            {user.image ? (
              <Image
                src={user.image}
                alt={displayName}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-emerald-800 font-bold text-sm">
                {firstName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold text-base-content/90">
            {firstName}
          </span>
          <svg
            className="w-3.5 h-3.5 text-base-content/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </label>

        {/* Pop-up Dropdown Content */}
        <div
          tabIndex={0}
          className="dropdown-content z-50 mt-2 w-64 rounded-2xl bg-[#f8faf8] border border-emerald-900/10 shadow-xl p-4 space-y-3"
        >
          {/* User Full Name & Email */}
          <div className="space-y-0.5 border-b border-base-200 pb-3">
            <p className="font-bold text-base text-base-content leading-tight">
              {displayName}
            </p>
            <p className="text-xs text-base-content/60 truncate font-medium">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          <ul className="space-y-1 text-sm font-medium">
            {/* Profile Link */}
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-3 py-2 text-base-content/80 hover:text-base-content hover:bg-base-200/60 rounded-xl transition-colors"
              >
                <span className="text-base">👤</span>
                <span>আমার প্রোফাইল</span>
              </Link>
            </li>

            {/* Sign Out Button */}
            <li>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
              >
                <span className="text-base">↩</span>
                <span>সাইন আউট</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // 2. Logged Out State (Sign In / Sign Up Buttons)
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Link
        href="/signin"
        className="btn btn-ghost btn-sm text-sm font-semibold text-base-content/80 hover:text-base-content hover:bg-base-200"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="btn btn-sm bg-emerald-700 hover:bg-emerald-800 text-white font-medium border-none rounded-xl px-5 shadow-md shadow-emerald-700/20"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default UserInfo;
