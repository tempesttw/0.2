import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-2xl animate-[modalIn_0.3s_cubic-bezier(0.22,1,0.36,1)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-[var(--muted)] transition-colors hover:bg-[var(--surface)] hover:text-white"
            aria-label="Fechar"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
