"use client";

import { useEffect, useState } from "react";

export default function BanglaDate() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const formatted = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());

      setDate(formatted);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // Return a stable placeholder or blank during the server render / initial hydration pass
  if (!date) {
    return (
      <span className="text-xs text-base-content/60 font-medium opacity-0">
        তারিখ লোড হচ্ছে...
      </span>
    );
  }

  return (
    <span className="text-xs text-base-content/60 font-medium">{date}</span>
  );
}
