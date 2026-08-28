import { Star, Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const TESTIMONIALS = [
  {
    name: 'Lucas Mendes',
    role: 'Aluno há 2 anos',
    text: 'A Spartacus mudou minha vida. Perdi 20kg em 6 meses com acompanhamento dos personais. O ambiente é motivador e os equipamentos são top!',
    rating: 5,
  },
  {
    name: 'Ana Carolina Silva',
    role: 'Aluna há 1 ano',
    text: 'Treino às 5h da manhã e a academia está lá, aberta e pronta. A flexibilidade de horário é incrível. Recomendo demais!',
    rating: 5,
  },
  {
    name: 'Rafael Oliveira',
    role: 'Aluno há 3 anos',
    text: 'Já passei por várias academias, mas nenhuma tem a energia da Spartacus. Os professores são atenciosos e as aulas em grupo são demais.',
    rating: 5,
  },
  {
    name: 'Juliana Costa',
    role: 'Aluna há 8 meses',
    text: 'Comecei do zero, nunca tinha treinado. Os professores me orientaram desde o primeiro dia. Hoje não consigo ficar sem treinar!',
    rating: 5,
  },
  {
    name: 'Pedro Henrique',
    role: 'Aluno há 1 ano e meio',
    text: 'O melhor custo-benefício da cidade. Estrutura de academia de primeiro mundo com preço justo. A área de funcional é completa.',
    rating: 5,
  },
  {
    name: 'Mariana Santos',
    role: 'Aluna há 2 anos',
    text: 'Adoro as aulas de spinning e HIIT! Os professores são muito qualificados e o ambiente é super acolhedor. Me sinto em casa aqui.',
    rating: 5,
  },
];

export function DepoimentosSection() {
  return (
    <section id="depoimentos" className="relative bg-[var(--bg-soft)] py-20 sm:py-32">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Depoimentos
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white sm:text-5xl">
              O que nossa <span className="text-[var(--accent)]">legião</span> diz
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-base text-[var(--muted)] sm:text-lg">
              Histórias de quem já entrou no campo de batalha.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="card-hover flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--accent)]/30">
                <Quote className="h-8 w-8 text-[var(--accent)]/30" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  "{t.text}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent)]/10 font-display text-sm font-bold text-[var(--accent-soft)]">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{t.name}</p>
                    <p className="truncate text-xs text-[var(--muted)]">{t.role}</p>
                  </div>
                  <div className="ml-auto flex shrink-0 gap-0.5">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-[var(--accent)] text-[var(--accent)]" />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
