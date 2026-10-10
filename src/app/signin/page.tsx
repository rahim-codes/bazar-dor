"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function SignInPage() {
  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    const { data, error } = await authClient.signIn.email({
      ...user,
    });
    if (data) {
      toast.success("সাইন ইন সফল হয়েছে!");
      redirect("/");
    }
    if (error) {
      toast.error(error.message ?? "সাইন ইন ব্যর্থ হয়েছে।");
    }
  };

  const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if (data) {
      toast.success("সাইন ইন সফল হয়েছে!");
      redirect("/");
    }
    if (!data) {
      toast.error("সাইন ইন ব্যর্থ হয়েছে।");
    }
  };

  const signInWithGithub = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
    if (data) {
      toast.success("সাইন ইন সফল হয়েছে!");
      redirect("/");
    }
    if (!data) {
      toast.error("সাইন ইন ব্যর্থ হয়েছে।");
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-10 px-4 mt-5">
      {/* ১. হেডার টাইটেল ও সাবটাইটেল */}
      <div className="text-center mb-6 space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-bold text-base-content">
          সাইন ইন
        </h2>
        <p className="text-sm text-base-content/60 font-medium">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* ২. ফর্ম কার্ড Container */}
      <div className="w-full max-w-md bg-[#f8faf8] border border-emerald-900/5 rounded-3xl p-6 sm:p-8 shadow-2xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ইমেইল */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-base-content/80">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full bg-base-100 border border-base-200 rounded-xl px-4 py-2.5 text-sm font-medium text-base-content placeholder:text-base-content/40 focus:outline-hidden focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* পাসওয়ার্ড */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-base-content/80">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              minLength={8}
              className="w-full bg-base-100 border border-base-200 rounded-xl px-4 py-2.5 text-sm font-medium text-base-content placeholder:text-base-content/40 focus:outline-hidden focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* সাবমিট বোতাম */}
          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-700/20 transition-colors mt-2"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        {/* ৩. 'অথবা' ডিভাইডার */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-base-200"></div>
          </div>
          <span className="relative bg-[#f8faf8] px-3 text-xs text-base-content/50 font-medium">
            অথবা
          </span>
        </div>

        {/* ৪. সোশ্যাল লগইন বাটনসমূহ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Google Button */}
          <button
            onClick={signInWithGoogle}
            type="button"
            className="flex items-center justify-center gap-2 bg-base-100 border border-base-200 hover:bg-base-200/50 text-base-content font-bold text-xs py-2.5 px-3 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          {/* GitHub Button */}
          <button
            onClick={signInWithGithub}
            type="button"
            className="flex items-center justify-center gap-2 bg-base-100 border border-base-200 hover:bg-base-200/50 text-base-content font-bold text-xs py-2.5 px-3 rounded-xl transition-colors"
          >
            <svg
              className="w-4 h-4 fill-current text-base-content"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        {/* ৫. অলরেডি অ্যাকাউন্ট থাকলে লগইন লিঙ্ক */}
        <div className="mt-6 text-center text-xs text-base-content/70 font-medium">
          অ্যাকাউন্ট নেই{" "}
          <Link
            href="/signup"
            className="text-emerald-700 font-bold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* ৬. ব্যাক টু হোম লিঙ্ক */}
      <div className="mt-6">
        <Link
          href="/"
          className="text-xs text-base-content/60 font-medium hover:text-base-content transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
