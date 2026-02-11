"use client";

const texts = [
  "✨ AI-powered Summaries",
  "✍ Improve Writing Instantly",
  "🏷 Auto Generate Tags",
  "🔒 Secure Authentication",
];

export default function RunningText() {
  return (
    <div className="relative mt-6 h-8 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap text-indigo-600 font-medium">
        {texts.map((t, i) => (
          <span key={i} className="mx-6">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
