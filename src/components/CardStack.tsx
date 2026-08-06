import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Star, MapPin, Clock, CalendarDays, Heart, ArrowLeft, ArrowRight, Sparkles,
} from 'lucide-react';
import { destinations, type Destination } from '@/data/destinations';

export default function CardStack() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [exit, setExit] = useState<null | 'left' | 'right'>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const lockRef = useRef(false);

  const count = destinations.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  const finishSwipe = useCallback(
    (dir: 'left' | 'right') => {
      if (lockRef.current) return;
      lockRef.current = true;
      setExit(dir);
      window.setTimeout(() => {
        if (dir === 'right') next();
        else prev();
        setExit(null);
        setDrag(null);
        startRef.current = null;
        lockRef.current = false;
      }, 420);
    },
    [next, prev]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (lockRef.current) return;
    startRef.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0 });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!startRef.current) return;
    setDrag({ x: e.clientX - startRef.current.x, y: e.clientY - startRef.current.y });
  };

  const onPointerUp = () => {
    if (!startRef.current || !drag) return;
    const threshold = 110;
    if (drag.x > threshold) finishSwipe('right');
    else if (drag.x < -threshold) finishSwipe('left');
    else {
      setDrag(null);
      startRef.current = null;
    }
  };

  // Keyboard navigation when section is focused
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  };

  // Auto-advance every 6s when idle
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!drag && !exit && !lockRef.current) next();
    }, 6000);
    return () => window.clearInterval(id);
  }, [next, drag, exit]);

  const active = destinations[index];
  const dx = drag?.x ?? 0;
  const dy = drag?.y ?? 0;
  const rot = dx / 18;
  const swipeProgress = Math.min(Math.abs(dx) / 110, 1);

  return (
    <section id="destinations" className="relative overflow-hidden bg-beige-50 py-24 sm:py-32">
      {/* soft background accents */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-forest-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-gold-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
          <div data-reveal="left">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-forest-700">
              <Sparkles className="h-4 w-4" /> The Collection
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl font-light text-forest-950 sm:text-5xl lg:text-6xl text-balance">
              Six journeys to
              <em className="text-gradient-forest font-medium not-italic"> lose yourself in</em>
            </h2>
          </div>
          <p data-reveal="right" className="max-w-sm text-beige-700">
            Drag, swipe, or tap the arrows. Each card opens onto a fully tailored itinerary —
            built around the way <em>you</em> like to travel.
          </p>
        </div>

        <div
          className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="group"
          aria-roledescription="carousel"
          aria-label="Destination cards"
        >
          {/* Card stack */}
          <div className="relative mx-auto h-[460px] w-full max-w-sm select-none sm:h-[540px]">
            {destinations.map((d, i) => {
              const rel = i - index;
              const isTop = rel === 0;
              if (rel < -1 && rel > 1) return null;

              // Cards behind the top one
              if (rel > 0) {
                return (
                  <div
                    key={d.id}
                    className="absolute inset-0 rounded-[32px] border border-beige-200 bg-beige-50-dark shadow-soft transition-all duration-500 ease-spring"
                    style={{
                      transform: `translateY(${rel * 18}px) scale(${1 - rel * 0.05})`,
                      zIndex: 10 - rel,
                      opacity: rel > 2 ? 0 : 1 - rel * 0.25,
                    }}
                    aria-hidden
                  />
                );
              }

              if (rel < 0) return null;

              // Top card — interactive
              const likedThis = !!liked[d.id];
              return (
                <article
                  key={d.id}
                  className="absolute inset-0 cursor-grab touch-none rounded-[32px] border border-beige-200 bg-beige-50 shadow-card active:cursor-grabbing"
                  style={{
                    transform: exit
                      ? `translateX(${exit === 'right' ? 140 : -140}%) rotate(${exit === 'right' ? 24 : -24}deg)`
                      : `translate(${dx}px, ${dy}px) rotate(${rot}deg)`,
                    transition: drag || exit ? 'none' : 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                    zIndex: 20,
                  }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[32px]">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="h-3/5 w-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-forest-950/55 px-3 py-1.5 text-xs font-semibold text-beige-50 backdrop-blur-sm">
                      <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                      {d.rating}
                      <span className="text-beige-50/60">({d.reviews.toLocaleString()})</span>
                    </div>

                    {/* swipe hint overlays */}
                    <div
                      className="absolute left-5 top-5 -rotate-12 rounded-xl border-2 border-forest-500 px-3 py-1 text-sm font-bold uppercase tracking-wider text-forest-600 transition-opacity"
                      style={{ opacity: dx < -30 ? swipeProgress : 0 }}
                    >
                      Pass
                    </div>
                    <div
                      className="absolute right-5 top-5 rotate-12 rounded-xl border-2 border-gold-500 px-3 py-1 text-sm font-bold uppercase tracking-wider text-gold-600 transition-opacity"
                      style={{ opacity: dx > 30 ? swipeProgress : 0 }}
                    >
                      Save
                    </div>

                    <div className="flex h-2/5 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="flex items-center gap-1 text-xs font-medium text-beige-600">
                            <MapPin className="h-3.5 w-3.5" /> {d.region}
                          </p>
                          <h3 className="mt-1 font-display text-2xl font-medium text-forest-950">
                            {d.name}, {d.country}
                          </h3>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLiked((m) => ({ ...m, [d.id]: !m[d.id] }));
                          }}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            likedThis
                              ? 'bg-coral-500 text-white shadow-ocean'
                              : 'bg-beige-100 text-beige-600 hover:bg-coral-50 hover:text-coral-500'
                          }`}
                          aria-label={likedThis ? 'Unlike' : 'Like'}
                        >
                          <Heart className={`h-5 w-5 ${likedThis ? 'fill-white' : ''}`} />
                        </button>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-beige-700">
                        {d.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex flex-wrap gap-1.5">
                          {d.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-forest-50 px-2.5 py-1 text-[11px] font-semibold text-forest-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] uppercase tracking-wide text-beige-600">from</p>
                          <p className="font-display text-xl font-semibold text-forest-950">
                            ${d.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* empty-state guard if everything is off-screen mid-swipe */}
            {destinations.map((_, i) => i).filter((i) => i >= index && i <= index + 2).length === 0 && (
              <div className="absolute inset-0 rounded-[32px] border border-beige-200 bg-beige-50 shadow-card" />
            )}
          </div>

          {/* Active destination detail panel */}
          <div className="relative">
            <DetailPanel
              key={active.id}
              destination={active}
              index={index}
              count={count}
              onPrev={prev}
              onNext={next}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-beige-300 text-forest-800 transition-all hover:border-forest-500 hover:bg-forest-50 hover:text-forest-700"
              aria-label="Previous destination"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-beige-300 text-forest-800 transition-all hover:border-forest-500 hover:bg-forest-50 hover:text-forest-700"
              aria-label="Next destination"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <span className="ml-2 font-display text-lg text-beige-700">
              <span className="text-forest-950">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-beige-400">/</span>
              {String(count).padStart(2, '0')}
            </span>
          </div>

          {/* progress dots */}
          <div className="flex items-center gap-2">
            {destinations.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-400 ${
                  i === index ? 'w-8 bg-forest-600' : 'w-2 bg-beige-200 hover:bg-beige-300'
                }`}
                aria-label={`Go to ${d.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailPanel({
  destination: d,
  index,
  count,
  onPrev,
  onNext,
}: {
  destination: Destination;
  index: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 text-sm text-beige-600">
        <span className="font-display text-3xl font-light text-forest-700">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="h-px w-10 bg-beige-200" />
        <span>{String(count).padStart(2, '0')} journeys</span>
      </div>

      <h3 className="mt-4 font-display text-4xl font-light text-forest-950 sm:text-5xl">
        {d.name}
      </h3>
      <p className="mt-1 text-lg text-beige-700">{d.tagline}</p>

      <p className="mt-6 max-w-md text-forest-800 leading-relaxed">{d.description}</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat icon={<Clock className="h-4 w-4" />} label="Duration" value={d.duration} />
        <Stat icon={<CalendarDays className="h-4 w-4" />} label="Best time" value={d.bestTime} />
        <Stat
          icon={<Star className="h-4 w-4 fill-gold-400 text-gold-400" />}
          label="Traveller rating"
          value={`${d.rating} / 5`}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {d.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-beige-300 px-3 py-1.5 text-xs font-semibold text-forest-800"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-9 flex items-center gap-5">
        <a
          href="#plan"
          className="group inline-flex items-center gap-2 rounded-full bg-forest-950 px-6 py-3.5 text-sm font-semibold text-beige-50 transition-all duration-300 hover:bg-forest-700 hover:shadow-ocean"
        >
          Tailor this journey
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-beige-700 underline-offset-4 transition-colors hover:text-forest-700 hover:underline"
        >
          Next destination
        </button>
        <button
          onClick={onPrev}
          className="hidden text-sm font-semibold text-beige-700 underline-offset-4 transition-colors hover:text-forest-700 hover:underline sm:inline"
        >
          Previous
        </button>
      </div>
    </div>
  );
}

function Stat({
  icon, label, value,
}: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-beige-200 bg-beige-50/60 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-beige-600">
        {icon}
        {label}
      </div>
      <p className="mt-1.5 font-display text-lg font-medium text-forest-950">{value}</p>
    </div>
  );
}
