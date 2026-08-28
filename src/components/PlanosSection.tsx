import { Star, Check } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export type PlanKey = 'mensal' | 'trimestral' | 'anual';

type Plan = {
  key: PlanKey;
  name: string;
  price: string;
  period: string;
  badge?: string;
  highlight?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    key: 'mensal',
    name: 'Mensal',
    price: '99',
    period: '/mês',
    features: [
      'Acesso ilimitado à academia',
      'Área de musculação completa',
      'Área cardio',
      'Aulas em grupo',
      'App de treino',
    ],
  },
  {
    key: 'trimestral',
    name: 'Trimestral',
    price: '259',
    period: '/3 meses',
    badge: 'MAIS VANTAJOSO',
    highlight: true,
    features: [
      'Tudo do plano Mensal',
      'Personal trainer 2x/semana',
      'Acesso a todas as modalidades',
      'Avaliação física mensal',
      'Desconto em suplementos',
      'Economia de R$ 38',
    ],
  },
  {
    key: 'anual',
    name: 'Anual',
    price: '899',
    period: '/ano',
    badge: 'MELHOR OFERTA',
    features: [
      'Tudo do plano Trimestral',
      'Personal trainer ilimitado',
      'Acesso VIP 24h',
      'Avaliação física semanal',
      'Programa nutricional',
      'Economia de R$ 289',
    ],
  },
];

type PlanosSectionProps = {
  onMatricula: (plan: PlanKey) => void;
};

export function PlanosSection({ onMatricula }: PlanosSectionProps) {
  return (
    <section id="planos" className="relative bg-[var(--bg-soft)] py-20 sm:py-32">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Planos
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white sm:text-5xl">
              Escolha sua <span className="text-[var(--accent)]">legião</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-base text-[var(--muted)] sm:text-lg">
              Planos sem fidelidade. Cancele quando quiser.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.key} delay={i * 150}>
              <div
                className={`group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
                  plan.highlight
                    ? 'mt-4 border-[var(--accent)] bg-gradient-to-b from-[var(--accent)]/[0.12] to-[var(--surface)] shadow-[0_0_32px_-8px] shadow-[var(--accent)]/30 hover:-translate-y-1'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:-translate-y-1 hover:border-white/20'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[var(--accent)]/40">
                    <Star className="h-3 w-3 fill-current" />
                    {plan.badge}
                  </span>
                )}

                {!plan.highlight && plan.badge && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:right-6 sm:top-6">
                    <Star className="h-3 w-3 fill-current" />
                    {plan.badge}
                  </span>
                )}

                <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
                  {plan.name}
                </h3>

                <div className="mt-5 flex items-baseline gap-1 sm:mt-6">
                  <span className="text-sm text-[var(--muted)]">R$</span>
                  <span
                    className={`font-display font-bold ${
                      plan.highlight ? 'text-5xl text-[var(--accent-soft)] drop-shadow-[0_0_18px_rgba(225,29,42,0.45)] sm:text-6xl' : 'text-4xl text-white sm:text-5xl'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm text-[var(--muted)]">{plan.period}</span>
                </div>

                <ul className="mt-6 space-y-3 sm:mt-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? 'text-[var(--accent-soft)]' : 'text-[var(--accent)]'}`}
                        strokeWidth={3}
                      />
                      <span className={`text-sm ${plan.highlight ? 'text-[var(--fg)]' : 'text-[var(--muted)]'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onMatricula(plan.key)}
                  className={`mt-7 w-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide sm:mt-8 ${
                    plan.highlight ? 'btn-primary' : 'btn-ghost'
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
