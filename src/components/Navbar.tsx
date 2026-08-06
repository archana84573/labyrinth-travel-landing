import { useEffect, useState } from 'react';
import { Menu, X, Compass } from 'lucide-react';

const links = [
  { label: 'Hidden Atlas', href: '#carousel' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Journeys', href: '#journeys' },
  { label: 'Stories', href: '#stories' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-soft py-3' : 'py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-forest-950">
          <LabyrinthMark className="h-8 w-8 text-forest-600" />
          <span className="font-display text-2xl font-semibold tracking-tight">Labyrinth</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-medium text-forest-800 transition-colors hover:text-forest-950"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-forest-600 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#plan"
            className="group inline-flex items-center gap-2 rounded-full bg-forest-950 px-5 py-2.5 text-sm font-semibold text-beige-50 transition-all duration-300 hover:bg-forest-700 hover:shadow-ocean"
          >
            Plan a journey
            <Compass className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-950/5 text-forest-950 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden px-5 transition-all duration-500 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mt-3 flex flex-col gap-1 rounded-2xl glass p-3 shadow-soft">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-medium text-forest-800 transition-colors hover:bg-forest-50"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#plan"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-xl bg-forest-950 px-4 py-3 text-center font-semibold text-beige-50"
            >
              Plan a journey
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export function LabyrinthMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M16 2.5 A13.5 13.5 0 1 1 2.5 16"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M16 7.5 A8.5 8.5 0 1 1 7.5 16 M16 12 A4 4 0 1 1 12 16"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
    </svg>
  );
}
