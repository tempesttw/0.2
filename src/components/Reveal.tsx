import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'span' | 'header' | 'footer' | 'article';
};

export function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as as 'div';

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
