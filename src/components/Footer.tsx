import { LabyrinthMark } from './Navbar';
import { Instagram, Twitter, Facebook, Youtube, ArrowUpRight } from 'lucide-react';

const cols = [
  {
    title: 'Destinations',
    links: ['Meghalaya', 'Hà Giang', 'Bhutan', 'El Nido', 'Hampi', 'Ella'],
  },
  {
    title: 'Company',
    links: ['Our story', 'The Labyrinth way', 'Guides', 'Sustainability', 'Careers', 'Press'],
  },
  {
    title: 'Support',
    links: ['Plan a journey', 'Contact', 'FAQs', 'Booking terms', 'Travel insurance', 'Privacy'],
  },
];

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative bg-forest-950 pt-20 text-beige-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 pb-14 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#top" className="flex items-center gap-2.5">
              <LabyrinthMark className="h-9 w-9 text-ocean-400" />
              <span className="font-display text-2xl font-semibold tracking-tight">Labyrinth</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-beige-50/60">
              Handcrafted journeys to the planet's least-visited corners — hidden beaches, hills
              and valleys the maps almost forgot. Get wonderfully lost, and find your way home
              with stories worth keeping.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-beige-50/15 text-beige-50/70 transition-all duration-300 hover:border-ocean-400 hover:bg-ocean-400 hover:text-forest-950"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ocean-300">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-sm text-beige-50/65 transition-colors hover:text-beige-50"
                    >
                      {l}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-beige-50/10 py-7 text-sm text-beige-50/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Labyrinth Travel Co. Get wonderfully lost.</p>
          <p className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-beige-50">Terms</a>
            <a href="#" className="transition-colors hover:text-beige-50">Privacy</a>
            <a href="#" className="transition-colors hover:text-beige-50">Cookies</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
