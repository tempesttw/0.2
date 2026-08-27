import { LogOut, User as UserIcon, Mail, CreditCard, BadgeCheck } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/hooks/useAuth';

type AccountModalProps = {
  open: boolean;
  onClose: () => void;
};

const PLAN_LABELS: Record<string, string> = {
  mensal: 'Mensal',
  trimestral: 'Trimestral',
  anual: 'Anual',
};

export function AccountModal({ open, onClose }: AccountModalProps) {
  const { user, member, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Minha conta">
      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-soft)]">
            <UserIcon className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-base font-semibold text-white">
              {member?.full_name ?? 'Membro SPARTACUS'}
            </p>
            <p className="text-sm text-[var(--muted)]">Bem-vindo de volta</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] px-4 py-3">
            <Mail className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-[var(--muted)]">E-mail</p>
              <p className="truncate text-sm text-white">{user?.email ?? '—'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] px-4 py-3">
            <CreditCard className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--muted)]">Plano</p>
              <p className="text-sm text-white">
                {member ? PLAN_LABELS[member.plan] ?? member.plan : '—'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] px-4 py-3">
            <BadgeCheck className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--muted)]">Status</p>
              <p className="flex items-center gap-2 text-sm capitalize text-white">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {member?.status ?? '—'}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--border)] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </Modal>
  );
}
