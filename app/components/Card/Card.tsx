import type { ReactNode } from 'react';

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="sm:rounded bg-white shadow px-4 py-5 sm:p-6">
      { children }
    </div>
  );
}

export default Card;
