import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { end: 86, suffix: '', label: 'Countries mapped', sub: 'and counting' },
  { end: 12400, suffix: '+', label: 'Journeys crafted', sub: 'since 2009' },
  { end: 340, suffix: '', label: 'Local guides', sub: 'on the ground' },
  { end: 98, suffix: '%', label: 'Would return', sub: 'guest survey 2025' },
];

export default function Stats() {
  return (
    <section className="relative bg-forest-950 py-20 text-beige-50">
      <div className="absolute inset-0 mesh-animate bg-gradient-to-br from-forest-950 via-forest-900 to-ocean-950 opacity-90" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  end, suffix, label, sub, delay,
}: { end: number; suffix: string; label: string; sub: string; delay: number }) {
  const { ref, value } = useCountUp<HTMLParagraphElement>(end);
  return (
    <div
      data-reveal="scale"
      style={{ transitionDelay: `${delay}ms` }}
      className="text-center sm:text-left"
    >
      <p ref={ref} className="font-display text-5xl font-light text-gradient-gold sm:text-6xl">
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 font-medium text-beige-50">{label}</p>
      <p className="text-sm text-beige-50/55">{sub}</p>
    </div>
  );
}
