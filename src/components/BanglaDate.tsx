"use client";

export default function BanglaDate() {
  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <span className="text-xs text-base-content/60 font-medium">{date}</span>
  );
}
