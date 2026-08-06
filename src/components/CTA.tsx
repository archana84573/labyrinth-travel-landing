import { useState } from 'react';
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { LabyrinthMark } from './Navbar';

const ctaImage =
  'https://images.pexels.com/photos/6861657/pexels-photo-6861657.jpeg?auto=compress&cs=tinysrgb&w=1600';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    const { error } = await supabase
      .from('subscribers')
      .insert({ email, source: 'cta' });

    if (error) {
      if (error.code === '23505') {
        setStatus('success');
        setMessage("You're already on the list — we'll be in touch soon.");
        return;
      }
      setStatus('error');
      setMessage('Something went wrong on our end. Please try again.');
      return;
    }

    setStatus('success');
    setMessage("You're in. A journey designer will reach out within 48 hours.");
    setEmail('');
  };

  return (
    <section id="plan" className="relative overflow-hidden bg-forest-950 py-24 text-beige-50 sm:py-32">
      <div className="absolute inset-0">
        <img src={ctaImage} alt="" className="h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/85 to-forest-950" />
      </div>

      {/* animated decorative mark */}
      <LabyrinthMark className="absolute left-1/2 top-12 h-24 w-24 -translate-x-1/2 text-ocean-400/30 animate-spin-slow" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ocean-300">
          Begin the journey
        </p>
        <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl text-balance">
          Your labyrinth is
          <em className="text-gradient-gold font-medium not-italic"> waiting to be drawn</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-beige-50/75">
          Leave your email and a journey designer will reach out within 48 hours to start
          shaping a trip that's unmistakably yours. No deposit, no obligation.
        </p>

        <form onSubmit={submit} className="mx-auto mt-10 max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="you@example.com"
              aria-label="Email address"
              disabled={status === 'loading' || status === 'success'}
              className="w-full flex-1 rounded-full border border-beige-50/20 bg-beige-50/10 px-5 py-3.5 text-beige-50 placeholder-beige-50/40 outline-none transition-all focus:border-ocean-400 focus:bg-beige-50/15 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-forest-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-gold disabled:opacity-70"
            >
              {status === 'loading' && <Loader2 className="h-5 w-5 animate-spin" />}
              {status === 'success' && <Check className="h-5 w-5" />}
              {status === 'idle' && (
                <>
                  Plan my journey
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
              {status === 'loading' && 'Sending…'}
              {status === 'success' && 'Subscribed'}
              {status === 'error' && 'Try again'}
            </button>
          </div>

          {message && (
            <p
              className={`mt-4 flex items-center justify-center gap-2 text-sm ${
                status === 'error' ? 'text-coral-300' : 'text-ocean-300'
              }`}
            >
              {status === 'error' && <AlertCircle className="h-4 w-4" />}
              {status === 'success' && <Check className="h-4 w-4" />}
              {message}
            </p>
          )}
        </form>

        <p className="mt-6 text-xs text-beige-50/45">
          By subscribing you agree to receive occasional travel inspiration from Labyrinth.
          Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
