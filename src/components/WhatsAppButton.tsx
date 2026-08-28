import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre a Spartacus."
      target="_blank"
      rel="noopener noreferrer"
      className="btn-press fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition-colors hover:bg-green-400 sm:bottom-6 sm:right-6"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
