import type { ReactNode } from 'react';

export default function LoginBackground({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="m-auto w-[28rem]">
        <div className="px-4 py-6 rounded-md bg-white shadow">
          { children }
        </div>
      </div>
    </div>
  );
}
