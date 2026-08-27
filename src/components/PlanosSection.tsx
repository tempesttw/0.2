import { Star } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export type PlanKey = 'mensal' | 'trimestral' | 'anual';

type Plan = {
  key: PlanKey;
  name: string;
  price: string;
  period: string;
  badge?: string;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    key: 'mensal',
    name: 'Mensal',
    price: '99',
    period: '/mês',
  },
  {
    key: 'trimestral',
    name: 'Trimestral',
    price: '259',
    period: '/3 meses',
    badge: 'MAIS ESCOLHIDO',
    highlight: true,
  },
  {
    key: 'anual',
    name: 'Anual',
    price: '899',
    period: '/ano',
  },
];

type PlanosSectionProps = {
  onMatricula: (plan: PlanKey) => void;
};

export function PlanosSection({ onMatricula }: PlanosSectionProps) {
  return (
    <section id="planos" className="relative bg-[var(--bg-soft)] py-24 sm:py-32">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Planos
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
              Escolha sua <span className="text-[var(--accent)]">legião</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.key} delay={i * 150}>
              <div
                className={`group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border p-8 text-center transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? 'border-[var(--accent)] bg-gradient-to-b from-[var(--accent)]/10 to-[var(--surface)] shadow-2xl shadow-[var(--accent)]/10 lg:-translate-y-4'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:border-white/20'
                }`}
              >
                {plan.badge && (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    <Star className="h-3 w-3 fill-current" />
                    {plan.badge}
                  </span>
                )}

                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                  {plan.name}
                </h3>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-sm text-[var(--muted)]">R$</span>
                  <span className="font-display text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-sm text-[var(--muted)]">{plan.period}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onMatricula(plan.key)}
                  className={`mt-8 w-full rounded-md px-6 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all ${
                    plan.highlight
                      ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30 hover:bg-[var(--accent-soft)]'
                      : 'border border-[var(--border)] text-white hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  Matricular-se
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
