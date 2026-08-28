import { Dumbbell, Flame, Timer, Heart, Zap, Users } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const MODALITIES = [
  {
    icon: Dumbbell,
    title: 'Musculação',
    desc: 'Equipamentos de alta performance para força e hipertropia.',
  },
  {
    icon: Flame,
    title: 'HIIT',
    desc: 'Treinos intervalados de alta intensidade para queimar gordura.',
  },
  {
    icon: Timer,
    title: 'Funcional',
    desc: 'Movimentos naturais para melhorar sua performance no dia a dia.',
  },
  {
    icon: Heart,
    title: 'Cardio',
    desc: 'Esteiras, bikes e elípticos para resistência cardiovascular.',
  },
  {
    icon: Zap,
    title: 'Powerlifting',
    desc: 'Agachamento, supino e levantamento terra com acompanhamento.',
  },
  {
    icon: Users,
    title: 'Aulas em Grupo',
    desc: 'Spinning, dança, alongamento e muito mais.',
  },
];

export function ModalidadesSection() {
  return (
    <section id="modalidades" className="relative bg-[var(--bg)] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Modalidades
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white sm:text-5xl">
              Treino para <span className="text-[var(--accent)]">todos</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-base text-[var(--muted)] sm:text-lg">
              Escolha sua batalha. Temos modalidades para todos os níveis e objetivos.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {MODALITIES.map((mod, i) => (
            <Reveal key={mod.title} delay={i * 100}>
              <div className="card-hover group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 hover:border-[var(--accent)]/40 hover:shadow-xl hover:shadow-[var(--accent)]/5">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--accent)]/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-[var(--accent)]/10" />
                <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent-soft)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-white sm:h-14 sm:w-14">
                  <mod.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <h3 className="relative mt-5 font-display text-lg font-bold uppercase tracking-wide text-white sm:mt-6 sm:text-xl">
                  {mod.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-[var(--muted)] sm:mt-3">
                  {mod.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
