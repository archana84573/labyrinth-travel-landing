import { Compass, Home, UtensilsCrossed, Camera, Users, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Compass,
    title: 'Guides who live it',
    body: 'Every journey is led by a local who calls the place home — the fisherman, the farmer, the forest keeper — not a clipboard and a headset.',
  },
  {
    icon: Home,
    title: 'Stays with a soul',
    body: 'Turf-roof cottages, mountain refuges, clifftop homestays and family-run lodges. We never put you in a place you could book yourself in five clicks.',
  },
  {
    icon: Camera,
    title: 'The pre-dawn access',
    body: 'A valley to yourself before the fog lifts, a beach before the first footprint, a glacier walk at first light. The moments others miss.',
  },
  {
    icon: UtensilsCrossed,
    title: 'A table at the right one',
    body: 'The village kitchen that doesn\'t advertise, the family that ferments their own honey wine, a market tour that ends in a home kitchen.',
  },
  {
    icon: Users,
    title: 'Small groups, always',
    body: 'Twelve travellers maximum, or just you. No megabus, no name tags, no rushed photo stops. Space to actually be where you are.',
  },
  {
    icon: ShieldCheck,
    title: 'Truly looked after',
    body: 'A concierge on call around the clock from the moment you book. Plans shift, we adapt — quietly, before you notice.',
  },
];

export default function Experiences() {
  return (
    <section id="experiences" className="relative bg-beige-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl" data-reveal>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-forest-700">
            The Labyrinth way
          </p>
          <h2 className="mt-3 font-display text-4xl font-light text-forest-950 sm:text-5xl lg:text-6xl text-balance">
            Not a tour. A <em className="text-gradient-forest font-medium not-italic">way of seeing.</em>
          </h2>
          <p className="mt-5 text-lg text-beige-700">
            Six promises that shape every journey we build — the difference between visiting a
            place and actually finding it.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.title}
              data-reveal="scale"
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              className="group relative overflow-hidden rounded-3xl border border-beige-200 bg-beige-50 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-forest-200 hover:shadow-card"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-forest-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-600 text-beige-50 transition-all duration-500 group-hover:rotate-6 group-hover:bg-ocean-600">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-forest-950">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-beige-700">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
