# 🛒 Bazar Dor (বাজার দর)

> A modern, real-time price-tracking and comparison web application built specifically for the Bangladeshi market. It provides daily market price updates for essential commodities like rice, lentils, oil, vegetables, fish, meat, eggs, and spices across different regions and vendors.

---

## 🚀 Features

1. **Real-Time Price Ticker (`PriceTicker`)**: A smooth, animated marquee ticker displaying live commodity price changes (increases/decreases) at a glance.
2. **Bengali Localization & Number Conversion**: Complete localized UI with Bengali typography (Hind Siliguri font) and a custom utility to convert standard digits into Bengali numerals (`toBengaliNumber`).
3. **Category & Product Filtering**: Browse essential items categorized logically with sorting logic by price changes (items with price hikes vs. price drops).
4. **Secure Authentication (`Better Auth`)**: Full user session management allowing users to sign up, log in, view profile details, update account info, and securely sign out.
5. **Protected Routes & Middleware**: Route protection implemented via Next.js Middleware to secure private pages like user profiles and category/product management.
6. **Robust API Fallback & Error Handling**: Graceful error handling with local mock fallbacks and 24-hour Next.js revalidation caching to mitigate external API rate limits (429 errors).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [daisyUI](https://daisyui.com/)
- **Authentication:** [Better Auth](https://better-auth.com/)
- **Language:** TypeScript
- **Notifications:** React Toastify (`react-toastify`)
- **Marquee Animation:** `react-fast-marquee`
- **Backend/Data Source:** Cloudflare Worker REST API (`api.abcz.workers.dev`)

---

live-link : https://bazar-dor-ca4l.vercel.app/
