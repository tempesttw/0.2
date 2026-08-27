import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/hooks/useAuth';

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
};

export function LoginModal({ open, onClose, onSwitchToSignup }: LoginModalProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: loginError } = await signIn(email, password);
    setLoading(false);
    if (loginError) {
      setError(loginError);
      return;
    }
    onClose();
  };

  const inputClass =
    'w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-white placeholder:text-[var(--muted)] transition-colors focus:border-[var(--accent)] focus:outline-none';

  return (
    <Modal open={open} onClose={onClose} title="Entrar">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            E-mail
          </label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="voce@email.com" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Senha
          </label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••" />
        </div>

        {error && (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:bg-[var(--accent-soft)] disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-center text-sm text-[var(--muted)]">
          Não tem conta?{' '}
          <button type="button" onClick={onSwitchToSignup} className="font-semibold text-[var(--accent-soft)] hover:underline">
            Criar minha conta
          </button>
        </p>
      </form>
    </Modal>
  );
}
