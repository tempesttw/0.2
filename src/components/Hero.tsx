import { ArrowRight, Play } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const HERO_IMG =
  'https://images.pexels.com/photos/17840/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600';

const STATS = [
  { value: '1.200+', label: 'Alunos ativos' },
  { value: '24h', label: 'Aberto todos os dias' },
  { value: '15', label: 'Profissionais' },
  { value: '800m²', label: 'De estrutura' },
];

const MARQUEE = ['Musculação', 'Funcional', 'Powerlifting', 'HIIT', 'Mobilidade', 'Força', 'Performance'];

type HeroProps = {
  onMatricula: () => void;
};

export function Hero({ onMatricula }: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Atleta realizando agachamento com barra no rack de agachamento da academia SPARTACUS"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/85 to-[var(--bg)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]/40" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-24 pb-16 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-soft)] sm:px-4 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Forja seu corpo, forja sua mente
          </span>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-bold uppercase leading-[0.95] text-white sm:mt-6 sm:text-7xl lg:text-8xl">
            Treine como
            <br />
            um <span className="text-[var(--accent)]">espartano</span>.
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:mt-6 sm:text-lg">
            Mais que uma academia. A SPARTACUS é o campo de batalha onde
            disciplina, força e superação se encontram — 24 horas por dia.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={onMatricula}
              className="btn-press group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-7 py-4 text-base font-semibold text-white shadow-xl shadow-[var(--accent)]/25 transition-colors hover:bg-[var(--accent-soft)] sm:w-auto"
            >
              Começar agora
              <ArrowRight className="icon-move h-5 w-5" />
            </button>
            <a
              href="#estrutura"
              className="btn-press group inline-flex w-full items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10 sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current" />
              Ver estrutura
            </a>
          </div>
        </Reveal>

        <Reveal delay={480}>
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-7 sm:mt-16 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-8">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-[var(--accent)]/60 pl-4">
                <dt className="font-display text-2xl font-bold text-white sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wider text-[var(--muted)] sm:text-xs">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-y border-[var(--border)] bg-[var(--bg-soft)]/80 py-4 backdrop-blur">
        <div className="mask-fade-x flex">
          <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
            {Array.from({ length: 2 }).flatMap((_, i) =>
              MARQUEE.map((w) => (
                <span key={`${i}-${w}`} className="flex items-center gap-10">
                  <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                    {w}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
