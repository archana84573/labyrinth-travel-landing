import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const showcase =
  'https://images.pexels.com/photos/19758641/pexels-photo-19758641.jpeg?auto=compress&cs=tinysrgb&w=1400';

const steps = [
  {
    no: '01',
    title: 'Tell us how you wander',
    body: 'A 20-minute call with a journey designer. No forms, no packages — just a conversation about the places you dream about and the pace you like to keep.',
  },
  {
    no: '02',
    title: 'We draft your labyrinth',
    body: 'Within a week you receive a hand-drawn itinerary: the route, the stays, the guides, the hidden detours. You refine it until it feels unmistakably yours.',
  },
  {
    no: '03',
    title: 'We carry the map',
    body: 'From the moment you leave home, every transfer, table, trail and ticket is handled. Your only job is to be present. We handle the rest, quietly.',
  },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = window.innerHeight / 2;
      setOffset((rect.top + rect.height / 2 - center) * 0.12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="journeys" ref={ref} className="relative overflow-hidden bg-forest-950 py-24 text-beige-50 sm:py-32">
      <div className="absolute inset-0 mesh-animate bg-gradient-to-br from-forest-950 via-forest-900 to-ocean-950" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Parallax image */}
        <div className="relative order-1 lg:order-none" data-reveal="left">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-beige-50/10">
            <img
              src={showcase}
              alt="Tea hills and a century-old viaduct in Sri Lanka's highlands"
              className="h-[120%] w-full object-cover"
              style={{ transform: `translateY(${-offset}px)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
          </div>
          {/* floating badge */}
          <div className="absolute -bottom-6 -right-4 flex items-center gap-4 rounded-2xl glass-dark p-5 shadow-card sm:-right-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-forest-950">
              <span className="font-display text-lg font-bold">15</span>
            </div>
            <div>
              <p className="font-display text-xl font-medium">Years guiding</p>
              <p className="text-sm text-beige-50/60">Since 2009</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ocean-300">
            How it works
          </p>
          <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl lg:text-6xl text-balance">
            Three steps to
            <em className="text-gradient-gold font-medium not-italic"> somewhere unforgettable</em>
          </h2>

          <div className="mt-10 space-y-2">
            {steps.map((s, i) => (
              <div
                key={s.no}
                data-reveal="right"
                style={{ transitionDelay: `${i * 120}ms` }}
                className="group flex gap-6 rounded-3xl p-6 transition-colors duration-500 hover:bg-beige-50/5"
              >
                <span className="font-display text-3xl font-light text-ocean-400/70 transition-colors group-hover:text-ocean-300">
                  {s.no}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-beige-50">{s.title}</h3>
                  <p className="mt-2 text-beige-50/70 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#plan"
            data-reveal
            className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-forest-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-gold"
          >
            Start your journey
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
