import { Instagram, Facebook, Youtube, MapPin, Phone, Clock, Dumbbell } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const SOCIAL = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export function SiteFooter() {
  return (
    <footer id="contato" className="relative border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Reveal>
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--accent)]">
                  <Dumbbell className="h-5 w-5 text-white" strokeWidth={2.5} />
                </span>
                <span className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  SPARTA<span className="text-[var(--accent)]">CUS</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
                Mais que treino, uma filosofia. Junte-se à legião que escolheu
                a disciplina como caminho para a excelência.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-6 flex gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-md border border-[var(--border)] text-[var(--muted)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent-soft)]"
                  >
                    <s.icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Contato
              </h3>
            </Reveal>
            <ul className="mt-5 space-y-4">
              <Reveal delay={100} as="li">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <span className="text-sm text-[var(--muted)]">
                    Av. dos Espartanos, 300 — Centro
                    <br />
                    São Paulo, SP
                  </span>
                </div>
              </Reveal>
              <Reveal delay={200} as="li">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <span className="text-sm text-[var(--muted)]">
                    (11) 3000-0000
                  </span>
                </div>
              </Reveal>
              <Reveal delay={300} as="li">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <span className="text-sm text-[var(--muted)]">
                    Aberto 24h · Todos os dias
                  </span>
                </div>
              </Reveal>
            </ul>
          </div>

          <div>
            <Reveal>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Newsletter
              </h3>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 text-sm text-[var(--muted)]">
                Receba treinos e desafios exclusivos dos nossos mestres.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Seu e-mail"
                  className="min-w-0 flex-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-soft)]"
                >
                  Assinar
                </button>
              </form>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} SPARTACUS. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Feito com disciplina e ferro.
          </p>
        </div>
      </div>
    </footer>
  );
}
