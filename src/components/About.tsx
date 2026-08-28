import { Check } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const STRUCTURE_IMG =
  'https://images.pexels.com/photos/4753885/pexels-photo-4753885.jpeg?auto=compress&cs=tinysrgb&w=1200';

const TRAINER_IMG =
  'https://images.pexels.com/photos/6455906/pexels-photo-6455906.jpeg?auto=compress&cs=tinysrgb&w=1200';

const FEATURES = [
  {
    title: 'Musculação completa',
    desc: 'Mais de 80 estações de treino com equipamentos de alta performance.',
  },
  {
    title: 'Personal trainers',
    desc: 'Profissionais certificados para montar e acompanhar seu protocolo.',
  },
  {
    title: 'Equipamentos de elite',
    desc: 'Halteres, anilhas, barras e máquinas de última geração.',
  },
  {
    title: 'Ambiente 24h',
    desc: 'Treine no seu ritmo, a qualquer hora do dia ou da noite.',
  },
];

export function About() {
  return (
    <section id="estrutura" className="relative bg-[var(--bg)] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                A estrutura
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white sm:text-5xl">
                Um campo de
                <br />
                <span className="text-[var(--accent)]">treino</span> de elite
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:mt-6 sm:text-lg">
                800m² divididos em zonas especializadas para você treinar com
                intensidade, segurança e variedade. Do iniciante ao atleta
                competitivo, há um lugar para você aqui.
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={300 + i * 100} as="li" direction="left">
                  <div className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-soft)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="relative">
            <Reveal direction="right">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border)]">
                <img
                  src={STRUCTURE_IMG}
                  alt="Interior da academia SPARTACUS com fileira de halteres organizados"
                  loading="lazy"
                  decoding="async"
                  width="640"
                  height="480"
                  className="h-[340px] w-full object-cover sm:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={200} direction="up">
              <div className="absolute -bottom-8 -left-4 hidden w-64 overflow-hidden rounded-xl border border-[var(--border)] shadow-2xl sm:block">
                <img
                  src={TRAINER_IMG}
                  alt="Personal trainer da SPARTACUS orientando exercício de aluno"
                  loading="lazy"
                  decoding="async"
                  width="256"
                  height="160"
                  className="h-40 w-full object-cover"
                />
                <div className="bg-[var(--surface)] px-4 py-3">
                  <p className="font-display text-sm font-semibold uppercase tracking-wide text-white">
                    +15 profissionais
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Prontos para te guiar
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
