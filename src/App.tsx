import { useState } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { PlanosSection, type PlanKey } from '@/components/PlanosSection';
import { SiteFooter } from '@/components/SiteFooter';
import { MatriculaModal } from '@/components/MatriculaModal';
import { LoginModal } from '@/components/LoginModal';
import { AccountModal } from '@/components/AccountModal';

type ModalType = 'login' | 'matricula' | 'account' | null;

function AppContent() {
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('mensal');

  const openModal = (type: ModalType, plan?: PlanKey) => {
    if (plan) setSelectedPlan(plan);
    setModal(type);
  };

  const closeModal = () => setModal(null);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      <SiteHeader onOpenModal={openModal} />
      <main>
        <Hero onMatricula={() => openModal('matricula', 'mensal')} />
        <About />
        <PlanosSection onMatricula={(plan) => openModal('matricula', plan)} />
      </main>
      <SiteFooter />

      <MatriculaModal
        open={modal === 'matricula'}
        onClose={closeModal}
        onSwitchToLogin={() => setModal('login')}
        plan={selectedPlan}
      />
      <LoginModal
        open={modal === 'login'}
        onClose={closeModal}
        onSwitchToSignup={() => setModal('matricula')}
      />
      <AccountModal open={modal === 'account'} onClose={closeModal} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
