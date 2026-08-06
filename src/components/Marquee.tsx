const items = [
  'Handcrafted itineraries',
  'Private local guides',
  '24/7 journey concierge',
  'Carbon-offset travel',
  'Off-the-map stays only',
  'Hidden-valley detours',
  'Pre-dawn access',
  'Truly refundable',
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <section className="border-y border-beige-200 bg-beige-100 py-5 marquee-paused">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-ocean-500" />
              <span className="font-display text-xl font-light tracking-tight text-forest-800">{t}</span>
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10" aria-hidden>
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-ocean-500" />
              <span className="font-display text-xl font-light tracking-tight text-forest-800">{t}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
