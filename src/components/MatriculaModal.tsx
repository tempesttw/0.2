import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

type MatriculaModalProps = {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  plan: 'mensal' | 'trimestral' | 'anual';
};

const PLAN_LABELS: Record<string, string> = {
  mensal: 'Mensal',
  trimestral: 'Trimestral',
  anual: 'Anual',
};

export function MatriculaModal({ open, onClose, onSwitchToLogin, plan }: MatriculaModalProps) {
  const { signUp, refreshMember } = useAuth();
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    if (form.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    let userId = signUpData.user?.id;

    // Se signUp não retornou usuário, a confirmação de email pode estar desativada
    // ou houve algum problema. Tenta fazer login.
    if (!userId && signUpData.session?.user) {
      userId = signUpData.session.user.id;
    }

    if (!userId) {
      // Se ainda não tem userId, tenta login (caso email confirmation esteja desativada)
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      userId = signInData.user?.id;
    }

    if (!userId) {
      setError('Não foi possível confirmar o cadastro. Tente fazer login.');
      setLoading(false);
      return;
    }

    const { error: memberError } = await supabase.from('members').insert({
      user_id: userId,
      full_name: form.full_name,
      phone: form.phone,
      cpf: form.cpf,
      plan,
      status: 'ativo',
    });

    if (memberError) {
      setError(memberError.message);
      setLoading(false);
      return;
    }

    await refreshMember();
    setLoading(false);
    onClose();
  };

  const inputClass =
    'w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-white placeholder:text-[var(--muted)] transition-colors focus:border-[var(--accent)] focus:outline-none';

  return (
    <Modal open={open} onClose={onClose} title="Matrícula">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Plano escolhido
          </label>
          <div className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-3 text-sm font-semibold text-[var(--accent-soft)]">
            {PLAN_LABELS[plan]}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Nome completo
          </label>
          <input type="text" required value={form.full_name} onChange={update('full_name')} className={inputClass} placeholder="Seu nome" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            E-mail
          </label>
          <input type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="voce@email.com" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Telefone
            </label>
            <input type="tel" required value={form.phone} onChange={update('phone')} className={inputClass} placeholder="(11) 99999-9999" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              CPF
            </label>
            <input type="text" required value={form.cpf} onChange={update('cpf')} className={inputClass} placeholder="000.000.000-00" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Senha
            </label>
            <input type="password" required value={form.password} onChange={update('password')} className={inputClass} placeholder="••••••" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Confirmar senha
            </label>
            <input type="password" required value={form.confirm} onChange={update('confirm')} className={inputClass} placeholder="••••••" />
          </div>
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
          {loading ? 'Processando...' : 'Confirmar matrícula'}
        </button>

        <p className="text-center text-sm text-[var(--muted)]">
          Já tem conta?{' '}
          <button type="button" onClick={onSwitchToLogin} className="font-semibold text-[var(--accent-soft)] hover:underline">
            Entrar
          </button>
        </p>
      </form>
    </Modal>
  );
}
