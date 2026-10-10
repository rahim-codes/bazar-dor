"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Track name input state, falling back to user?.name when available
  const [nameInput, setNameInput] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Determine current display name: local state takes precedence if user is typing, otherwise user.name
  const currentName = nameInput !== null ? nameInput : user?.name || "";

  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল হয়েছে!");
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  };

  // প্রোফাইল নাম আপডেট হ্যান্ডলার
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentName.trim()) {
      toast.error("অনুগ্রহ করে সঠিক নাম লিখুন");
      return;
    }

    try {
      setIsUpdating(true);
      await authClient.updateUser({
        name: currentName,
      });
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("তথ্য আপডেট করতে ব্যর্থ হয়েছে");
    } finally {
      setIsUpdating(false);
    }
  };

  // লোডিং স্টেট
  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-base-200 rounded-xl"></div>
        <div className="h-28 bg-base-200 rounded-3xl"></div>
        <div className="h-48 bg-base-200 rounded-3xl"></div>
      </div>
    );
  }

  // লগইন না থাকলে মেসেজ ও রিডাইরেক্ট
  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-[#f8faf8] border border-emerald-900/5 rounded-3xl text-center space-y-4">
        <p className="text-base-content/70 font-medium">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>
        <button
          onClick={() => router.push("/login")}
          className="btn bg-emerald-700 hover:bg-emerald-800 text-white font-medium border-none rounded-xl px-6"
        >
          সাইন ইন করুন
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* ১. হেডার টাইটেল ও সাবটাইটেল */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-base-content/60 font-medium">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* ২. ইউজার প্রোফাইল কার্ড */}
      <div className="w-full bg-[#f8faf8] border border-emerald-900/5 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-emerald-100 relative shrink-0 flex items-center justify-center border border-emerald-900/10">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User Avatar"}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-emerald-800 font-bold text-2xl">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold text-base-content leading-tight">
              {user.name || "User Name"}
            </h2>
            <p className="text-xs sm:text-sm text-base-content/60 font-medium">
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full sm:w-auto flex items-center justify-center gap-2 border border-red-300 bg-white hover:bg-red-50 text-red-600 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shadow-2xs"
        >
          <span>↩</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* ৩. তথ্য আপডেট ফরম কার্ড */}
      <div className="w-full bg-[#f8faf8] border border-emerald-900/5 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xs">
        <h2 className="text-lg font-bold text-base-content">তথ্য</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-base-content/80">
              নাম
            </label>
            <input
              type="text"
              value={currentName}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              className="w-full bg-base-100 border border-base-200 rounded-xl px-4 py-3 text-sm font-medium text-base-content placeholder:text-base-content/40 focus:outline-hidden focus:border-emerald-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-700/20 transition-colors disabled:opacity-50"
          >
            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}
