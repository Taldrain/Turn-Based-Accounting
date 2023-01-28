import type { ReactNode } from 'react';

function Card({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={`sm:rounded bg-white shadow px-4 py-5 sm:p-6 ${className}`}>
      { children }
    </div>
  );
}

export default Card;
