import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, MapPin, Star } from 'lucide-react';
import { destinations } from '@/data/destinations';

export default function Carousel3D() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const rotationRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(performance.now());

  const count = destinations.length;
  const angleStep = 360 / count;
  const radius = 360;

  // Smooth rAF-driven rotation that we can read to find the front card
  useEffect(() => {
    const tick = (now: number) => {
      const dt = now - lastRef.current;
      lastRef.current = now;
      if (!paused) {
        rotationRef.current -= dt * 0.012; // ~7.2deg per 6s full rotation
      }
      const cyl = cylRef.current;
      if (cyl) {
        cyl.style.transform = `translateZ(-${radius}px) rotateY(${rotationRef.current}deg)`;
      }
      // Derive the front card: nearest to 0deg after modulo
      const norm = ((-rotationRef.current % 360) + 360) % 360;
      const front = Math.round(norm / angleStep) % count;
      setActive(front);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, count, angleStep]);

  const cylRef = useRef<HTMLDivElement | null>(null);

  const snapTo = (dir: 1 | -1) => {
    // Advance rotation by exactly one card's angle
    rotationRef.current -= dir * angleStep;
  };

  return (
    <section
      id="carousel"
      className="relative overflow-hidden bg-forest-950 pt-16 pb-20 text-beige-50 sm:pt-20 sm:pb-24"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-forest-700/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-ocean-700/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center" data-reveal="fade">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ocean-300">
            The Hidden Atlas
          </p>
          <h2 className="mt-3 mx-auto max-w-3xl font-display text-4xl font-light text-beige-50 sm:text-5xl lg:text-6xl text-balance">
            Places the maps <em className="text-gradient-ocean font-medium not-italic">almost forgot</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-beige-50/70">
            A turning atlas of the beaches, hills and valleys the crowds never reached.
            Hover to pause the carousel, or use the arrows to wander.
          </p>
        </div>

        {/* 3D carousel */}
        <div
          className="carousel-scene relative mt-10 h-[480px] w-full select-none sm:h-[540px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={cylRef}
            className="carousel-cylinder absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: `translateZ(-${radius}px)` }}
          >
            {destinations.map((d, i) => {
              const angle = i * angleStep;
              return (
                <div
                  key={d.id}
                  className="carousel-card absolute h-[380px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] transition-shadow duration-500 sm:h-[440px] sm:w-[290px]"
                  style={{
                    transform: ` translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                    boxShadow: active === i
                      ? '0 30px 70px -20px rgba(13,34,24,0.7), 0 0 50px -8px rgba(40,132,176,0.55)'
                      : '0 18px 40px -16px rgba(13,34,24,0.55)',
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-beige-50/10 bg-forest-900">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="h-full w-full object-cover"
                      loading={i < 4 ? 'eager' : 'lazy'}
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/25 to-transparent" />

                    {/* terrain tag */}
                    <span className="absolute left-4 top-4 rounded-full bg-ocean-600/80 px-3 py-1 text-xs font-semibold text-beige-50 backdrop-blur-sm">
                      {d.terrain}
                    </span>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="flex items-center gap-1 text-xs font-medium text-beige-50/70">
                        <MapPin className="h-3.5 w-3.5" /> {d.country}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-medium text-beige-50">
                        {d.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-beige-50/70">{d.tagline}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs font-semibold text-gold-300">
                          <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                          {d.rating}
                        </span>
                        <span className="text-xs font-medium text-beige-50/60">
                          from ${d.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-forest-950 to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-forest-950 to-transparent sm:w-40" />
        </div>

        {/* Controls + active label */}
        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => snapTo(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-beige-50/20 text-beige-50/80 transition-all hover:border-ocean-400 hover:bg-ocean-700/30 hover:text-beige-50"
              aria-label="Previous place"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => snapTo(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-beige-50/20 text-beige-50/80 transition-all hover:border-ocean-400 hover:bg-ocean-700/30 hover:text-beige-50"
              aria-label="Next place"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="text-center sm:text-right">
            <p className="text-xs uppercase tracking-wide text-beige-50/40">Now in view</p>
            <p className="font-display text-2xl font-medium text-beige-50">
              {destinations[active].name}
              <span className="text-beige-50/40">, {destinations[active].country}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
