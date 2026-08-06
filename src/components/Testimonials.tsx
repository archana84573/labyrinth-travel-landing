import { useEffect, useState } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      'They sent us to a Meghalaya valley where a bridge made of living roots crosses a jungle river. We ate with the Khasi guide\'s family while rain hammered the leaves. That is a labyrinth, in the best sense.',
    name: 'Amara Okafor',
    detail: 'Meghalaya, 7 nights',
    avatar: 'https://images.pexels.com/photos/34017584/pexels-photo-34017584.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
  {
    quote:
      'I have travelled with the big names. None came close. The Labyrinth team rerouted us around a storm in Hà Giang and we ended up on a cliff-edge road past rice terraces with no one on it, mist peeling off the peaks. Faultless.',
    name: 'Marcus Lindqvist',
    detail: 'Hà Giang Loop, 6 nights',
    avatar: 'https://images.pexels.com/photos/27404283/pexels-photo-27404283.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
  {
    quote:
      'Our guide in Bhutan had walked to the Tiger\'s Nest as a child. He knew which pace to keep at altitude, where to pause for the cloud breaks, and which prayer flag was his grandfather\'s. We felt like insiders, not tourists.',
    name: 'Priya & Daniel',
    detail: 'Bhutan, 8 nights',
    avatar: 'https://images.pexels.com/photos/34505115/pexels-photo-34505115.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
  {
    quote:
      'Every detail was considered without ever feeling staged. The root bridges of Meghalaya, the lagoons of El Nido, the tea hills of Ella — it all felt arranged just for us. Because it had been.',
    name: 'Sofia Marchetti',
    detail: 'Meghalaya & El Nido, 12 nights',
    avatar: 'https://images.pexels.com/photos/31337959/pexels-photo-31337959.jpeg?auto=compress&cs=tinysrgb&w=120',
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <section id="stories" className="relative overflow-hidden bg-beige-100 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-ocean-300 to-transparent" />
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center" data-reveal="fade">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-forest-700">
            Traveller stories
          </p>
          <h2 className="mt-3 font-display text-4xl font-light text-forest-950 sm:text-5xl lg:text-6xl text-balance">
            Voices from <em className="text-gradient-forest font-medium not-italic">the road</em>
          </h2>
        </div>

        <div className="relative mt-14" data-reveal>
          <Quote className="mx-auto h-12 w-12 text-ocean-300" />

          <div className="relative mx-auto mt-6 min-h-[240px] max-w-3xl text-center sm:min-h-[200px]">
            {testimonials.map((item, idx) => (
              <blockquote
                key={idx}
                className="absolute inset-0 transition-all duration-700 ease-spring"
                style={{
                  opacity: idx === i ? 1 : 0,
                  transform: idx === i ? 'translateY(0)' : 'translateY(16px)',
                  pointerEvents: idx === i ? 'auto' : 'none',
                }}
              >
                <p className="font-display text-2xl font-light leading-snug text-forest-900 text-balance sm:text-3xl">
                  "{item.quote}"
                </p>
                <div className="mt-7 flex items-center justify-center gap-4">
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-ocean-200"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-forest-950">{item.name}</p>
                    <p className="text-sm text-beige-700">{item.detail}</p>
                  </div>
                  <div className="ml-2 flex">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
              </blockquote>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => setI((v) => (v - 1 + count) % count)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-beige-300 text-forest-800 transition-all hover:border-ocean-400 hover:bg-ocean-50 hover:text-ocean-700"
              aria-label="Previous story"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition-all duration-400 ${
                    idx === i ? 'w-7 bg-forest-600' : 'w-2 bg-beige-300 hover:bg-beige-400'
                  }`}
                  aria-label={`Story ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((v) => (v + 1) % count)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-beige-300 text-forest-800 transition-all hover:border-ocean-400 hover:bg-ocean-50 hover:text-ocean-700"
              aria-label="Next story"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
