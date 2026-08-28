import type { ReactNode } from 'react';
import { useReveal, type RevealDirection } from '@/hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'span' | 'header' | 'footer' | 'article';
  direction?: RevealDirection;
  distance?: number;
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  direction = 'up',
  distance,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ direction, distance });
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
