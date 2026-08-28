import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock, Dumbbell, Send } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useState } from 'react';

const SOCIAL = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export function SiteFooter() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setContactForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  const update = (k: keyof typeof contactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContactForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <footer id="contato" className="relative border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-4 py-16 pb-24 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
          {/* Coluna 1 - Sobre */}
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
                    className="btn-press grid h-10 w-10 place-items-center rounded-md border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent-soft)]"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Coluna 2 - Contato */}
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
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <span className="text-sm text-[var(--muted)]">
                    contato@spartacus.com.br
                  </span>
                </div>
              </Reveal>
              <Reveal delay={400} as="li">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <span className="text-sm text-[var(--muted)]">
                    Aberto 24h · Todos os dias
                  </span>
                </div>
              </Reveal>
            </ul>
          </div>

          {/* Coluna 3 - Links */}
          <div>
            <Reveal>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Links
              </h3>
            </Reveal>
            <ul className="mt-5 space-y-3">
              {['Início', 'Estrutura', 'Modalidades', 'Planos', 'Depoimentos', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-[var(--muted)] transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Formulário */}
          <div>
            <Reveal>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Fale conosco
              </h3>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 text-sm text-[var(--muted)]">
                Tem alguma dúvida? Envie sua mensagem!
              </p>
            </Reveal>
            <Reveal delay={200}>
              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={update('name')}
                  placeholder="Seu nome"
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={update('email')}
                  placeholder="Seu e-mail"
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={update('phone')}
                  placeholder="Telefone (opcional)"
                  className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
                <textarea
                  required
                  rows={3}
                  value={contactForm.message}
                  onChange={update('message')}
                  placeholder="Sua mensagem..."
                  className="w-full resize-none rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-press flex w-full items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-soft)]"
                >
                  <Send className="h-4 w-4" />
                  Enviar mensagem
                </button>
                {sent && (
                  <p className="text-center text-sm text-green-400">
                    Mensagem enviada com sucesso!
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>

        {/* Mapa */}
        <Reveal>
          <div className="mt-16 overflow-hidden rounded-2xl border border-[var(--border)]">
            <iframe
              title="Localização Spartacus"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976554781!2d-46.6558!3d-23.5629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQ2LjQiUyA0NsKwMzknMjAuOSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

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
