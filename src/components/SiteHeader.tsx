import { useEffect, useRef, useState } from 'react';
import { Dumbbell, X, MapPin, Phone, Mail, Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type ModalType = 'login' | 'matricula' | 'account';

type SiteHeaderProps = {
  onOpenModal: (type: ModalType, plan?: 'mensal' | 'trimestral' | 'anual') => void;
};

const MENU_ITEMS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Modalidades', href: '#modalidades' },
  { label: 'Planos', href: '#planos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
];

export function SiteHeader({ onOpenModal }: SiteHeaderProps) {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top bar com contatos */}
      <div className="hidden lg:block border-b border-[var(--border)]/40 bg-[var(--bg)]/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-2 text-xs">
          <div className="flex items-center gap-5 text-[var(--muted)]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              Av. dos Espartanos, 300 — Centro
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" />
              (11) 3000-0000
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3" />
              contato@spartacus.com.br
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[var(--accent-soft)]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Aberto 24h · Todos os dias
          </span>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`fixed top-0 lg:top-8 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'lg:top-0 bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 lg:h-20">
          {/* Logo */}
          <a href="#inicio" className="group flex items-center gap-2.5" aria-label="SPARTACUS — ir para o início">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--accent)] shadow-[0_0_20px_-2px] shadow-[var(--accent)]/60 transition-transform group-hover:scale-105 group-active:scale-95">
              <Dumbbell className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-wider text-white sm:text-xl">
              SPARTA<span className="text-[var(--accent)]">CUS</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="nav-link text-sm font-medium text-[var(--muted)] transition-colors hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <button
                type="button"
                onClick={() => onOpenModal('account')}
                className="hidden rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/5 btn-press lg:inline-block"
              >
                Minha conta
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenModal('login')}
                className="hidden rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/5 btn-press lg:inline-block"
              >
                Entrar
              </button>
            )}

            {/* CTA Matricule-se */}
            <button
              type="button"
              onClick={() => onOpenModal('matricula')}
              className="hidden sm:inline-flex rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/25 transition-all hover:bg-[var(--accent-soft)] btn-press lg:inline-flex lg:px-5"
            >
              Matricule-se
            </button>

            {/* Mobile menu toggle */}
            <div className="relative lg:hidden" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-md border border-[var(--border)] text-white transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 btn-press"
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              {/* Mobile full-width menu panel */}
              <div
                id="mobile-menu"
                className={`fixed left-0 right-0 top-16 max-h-[calc(100dvh-4rem)] origin-top overflow-y-auto border-b border-[var(--border)] bg-[var(--bg-soft)]/98 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                  menuOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible -translate-y-2 opacity-0'
                }`}
              >
                <nav className="mx-auto max-w-7xl px-4 py-4" aria-label="Navegação móvel">
                  {MENU_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-white"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="my-2 h-px bg-[var(--border)]" />
                  {user ? (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenModal('account');
                      }}
                      className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-white"
                    >
                      Minha conta
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenModal('login');
                      }}
                      className="block w-full rounded-lg px-4 py-3 text-left text-base font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-white"
                    >
                      Entrar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenModal('matricula');
                    }}
                    className="btn-press mt-2 block w-full rounded-lg bg-[var(--accent)] px-4 py-3 text-center text-base font-semibold text-white hover:bg-[var(--accent-soft)]"
                  >
                    Matricule-se agora
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
