import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star, MapPin, Play, ChevronDown } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { LabyrinthMark } from './Navbar';

const valleyBg =
  'https://images.pexels.com/photos/31418545/pexels-photo-31418545.jpeg?auto=compress&cs=tinysrgb&w=1800';

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      setScroll(Math.min(window.scrollY / el.offsetHeight, 1.5));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const picks = destinations.slice(0, 5);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen min-h-[680px] overflow-hidden bg-forest-950"
    >
      {/* ===== Valley background ===== */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: reduceMotion ? undefined : `translateY(${scroll * 120}px) scale(1.08)`,
        }}
      >
        <img
          src={valleyBg}
          alt="A hidden valley of green hills and karst peaks in Southeast Asia"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/55 via-forest-950/40 to-forest-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-forest-950/20 to-transparent" />
      </div>

      {/* ===== Hover-reveal destination images ===== */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {picks.map((d, i) => {
          const active = hovered === i;
          return (
            <div
              key={d.id}
              className="absolute inset-0 transition-all duration-700 ease-spring"
              style={{
                opacity: active ? 1 : 0,
                transform: `scale(${active ? 1.05 : 1.15}) translateY(${scroll * 80}px)`,
              }}
            >
              <img
                src={d.image}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-forest-950/55 via-forest-950/35 to-forest-950" />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-forest-950/20 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* ===== Content ===== */}
      <div
        className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-20 sm:px-8"
        style={{
          transform: `translateY(${scroll * 90}px)`,
          opacity: Math.max(0, 1 - scroll * 1.4),
        }}
      >
        {/* Eyebrow */}
        <div className="animate-fade-up inline-flex w-fit items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium tracking-wide text-beige-50/90">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-gold-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
          </span>
          Now booking journeys for 2026
        </div>

        {/* Company name */}
        <h1
          className="animate-fade-up mt-6 font-display text-6xl font-light leading-[0.9] text-beige-50 sm:text-7xl lg:text-8xl xl:text-[7.5rem]"
          style={{ animationDelay: '0.1s' }}
        >
          Labyrinth
          <br />
          <span className="text-gradient-gold font-medium">Travel Co.</span>
        </h1>

        {/* Divider */}
        <div
          className="animate-fade-up mt-7 h-px w-40 origin-left bg-gradient-to-r from-gold-400 to-transparent"
          style={{ animationDelay: '0.25s' }}
        />

        {/* Subcopy */}
        <p
          className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-beige-50/85"
          style={{ animationDelay: '0.35s' }}
        >
          We craft journeys to the Indian subcontinent and Southeast Asia's least-visited
          corners — hidden beaches, hills and valleys the maps almost forgot. Get wonderfully
          lost in the world.
        </p>

        {/* Hover-reveal destination list */}
        <div
          className="animate-fade-up mt-10"
          style={{ animationDelay: '0.5s' }}
        >
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-beige-50/55">
            <MapPin className="h-3.5 w-3.5" />
            Hover to peek at our signature journeys
          </p>
          <ul
            className="flex flex-wrap gap-x-8 gap-y-2"
            onMouseLeave={() => setHovered(null)}
          >
            {picks.map((d, i) => {
              const active = hovered === i;
              return (
                <li key={d.id}>
                  <button
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className="group relative font-display text-2xl font-light transition-all duration-300 sm:text-3xl"
                  >
                    <span
                      className={`transition-colors duration-300 ${
                        active
                          ? 'text-transparent'
                          : hovered === null
                          ? 'text-beige-50/80'
                          : 'text-beige-50/30'
                      }`}
                    >
                      {d.name}
                    </span>
                    {/* gradient fill revealed on hover */}
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-gold-300 to-coral-400 bg-clip-text text-transparent transition-opacity duration-300 ${
                        active ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {d.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTAs */}
        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: '0.65s' }}
        >
          <a
            href="#destinations"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold text-forest-950 shadow-gold transition-all duration-300 hover:bg-gold-400 hover:shadow-lg"
          >
            Explore destinations
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <button className="group inline-flex items-center gap-3 rounded-full border border-beige-50/30 px-5 py-3.5 text-base font-medium text-beige-50 backdrop-blur-sm transition-all duration-300 hover:border-beige-50/60 hover:bg-beige-50/10">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-beige-50/15 transition-colors group-hover:bg-beige-50/25">
              <Play className="h-4 w-4 fill-beige-50 text-beige-50" />
            </span>
            Watch the film
          </button>
        </div>

        {/* Trust row */}
        <div
          className="animate-fade-up mt-11 flex flex-wrap items-center gap-x-8 gap-y-4 text-beige-50/80"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-sm">
              <strong className="font-semibold text-beige-50">4.9</strong> · 12,400+ journeys
            </span>
          </div>
          <div className="hidden h-5 w-px bg-beige-50/25 sm:block" />
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-ocean-300" />
            86 countries and counting
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => window.scrollTo({ top: window.innerHeight - 60, behavior: 'smooth' })}
        className="animate-fade-up absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-beige-50/70 transition-colors hover:text-beige-50"
        style={{ animationDelay: '1s' }}
        aria-label="Scroll to explore"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll to explore</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-beige-50/30">
          <span className="mt-1.5 h-1.5 w-1.5 animate-scroll-dot rounded-full bg-beige-50/70" />
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>

      <div className="animate-fade-up pointer-events-none absolute bottom-8 right-8 z-20 hidden md:block" style={{ animationDelay: '1.1s' }}>
        <LabyrinthMark className="h-12 w-12 text-beige-50/30" />
      </div>
    </section>
  );
}
