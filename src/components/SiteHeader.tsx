import { useEffect, useRef, useState } from 'react';
import { Dumbbell, MoreVertical } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type ModalType = 'login' | 'matricula' | 'account';

type SiteHeaderProps = {
  onOpenModal: (type: ModalType, plan?: 'mensal' | 'trimestral' | 'anual') => void;
};

const MENU_ITEMS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Personais', href: '#estrutura' },
  { label: 'Planos', href: '#planos' },
  { label: 'Contato', href: '#contato' },
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        {/* Logo */}
        <a href="#inicio" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--accent)] shadow-[0_0_20px_-2px] shadow-[var(--accent)]/60 transition-transform group-hover:scale-105">
            <Dumbbell className="h-5 w-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-wider text-white">
            SPARTA<span className="text-[var(--accent)]">CUS</span>
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <button
              type="button"
              onClick={() => onOpenModal('account')}
              className="hidden rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/5 sm:inline-block"
            >
              Minha conta
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenModal('login')}
              className="hidden rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/5 sm:inline-block"
            >
              Entrar
            </button>
          )}

          {/* ⋮ menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-md border border-[var(--border)] text-white transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10"
              aria-label="Abrir menu"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            <div
              className={`absolute right-0 top-12 w-52 origin-top-right overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-2xl transition-all duration-200 ${
                menuOpen
                  ? 'visible scale-100 opacity-100'
                  : 'invisible scale-95 opacity-0'
              }`}
            >
              <nav className="flex flex-col p-2">
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className="rounded-lg px-4 py-3 text-left text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-white"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="my-1 h-px bg-[var(--border)]" />
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenModal('account');
                    }}
                    className="rounded-lg px-4 py-3 text-left text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-white"
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
                    className="rounded-lg px-4 py-3 text-left text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-white"
                  >
                    Entrar
                  </button>
                )}
              </nav>
            </div>
          </div>


        </div>
      </div>
    </header>
  );
}
