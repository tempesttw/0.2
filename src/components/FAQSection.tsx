import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const FAQ_ITEMS = [
  {
    q: 'Preciso ter experiência para treinar na Spartacus?',
    a: 'Não! Recebemos todos os níveis, do iniciante ao atleta avançado. Nossos professores estão prontos para te orientar desde o primeiro dia e montar um treino personalizado para seu objetivo.',
  },
  {
    q: 'A academia fica aberta 24 horas?',
    a: 'Sim! Funcionamos 24 horas por dia, 7 dias por semana. Você pode treinar no horário que for mais conveniente para sua rotina.',
  },
  {
    q: 'Posso cancelar minha matrícula a qualquer momento?',
    a: 'Sim, sem burocracia. Basta entrar em contato com nossa equipe pelo WhatsApp ou diretamente na recepção. O cancelamento é simples e rápido.',
  },
  {
    q: 'Vocês oferecem personal trainer?',
    a: 'Sim! Temos uma equipe de personal trainers qualificados que podem acompanhar seus treinos e montar programas exclusivos para seus objetivos. Consulte os valores na recepção.',
  },
  {
    q: 'Posso levar amigos para treinar comigo?',
    a: 'Claro! Temos o plano "Leve um Amigo" onde você pode trazer um convidado para treinar junto. Consulte as condições na recepção.',
  },
  {
    q: 'Vocês aceitam quais formas de pagamento?',
    a: 'Aceitamos cartão de crédito, débito, PIX e boleto bancário. Oferecemos despagamentos para pagamentos antecipados (trimestral e anual).',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--accent-soft)]"
      >
        <span className="text-base font-medium text-white">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[var(--muted)] transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-[var(--muted)]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="relative bg-[var(--bg)] py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <div className="text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              FAQ
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white sm:text-5xl">
              Perguntas <span className="text-[var(--accent)]">frequentes</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-12">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <FAQItem q={item.q} a={item.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
