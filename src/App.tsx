import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Carousel3D from '@/components/Carousel3D';
import CardStack from '@/components/CardStack';
import Stats from '@/components/Stats';
import Experiences from '@/components/Experiences';
import Journey from '@/components/Journey';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';

export default function App() {
  useReveal();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-beige-50">
      {/* Scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-forest-500 via-ocean-400 to-gold-400 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Carousel3D />
        <CardStack />
        <Stats />
        <Experiences />
        <Journey />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
