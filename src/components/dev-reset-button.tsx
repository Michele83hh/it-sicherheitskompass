'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export function DevResetButton() {
  const [confirmed, setConfirmed] = useState(false);

  if (process.env.NODE_ENV !== 'development') return null;

  const handleReset = () => {
    if (!confirmed) {
      setConfirmed(true);
      setTimeout(() => setConfirmed(false), 3000);
      return;
    }
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <button
      onClick={handleReset}
      className="fixed bottom-4 right-4 z-[9999] flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-2 text-xs font-medium text-white shadow-lg transition-all hover:bg-red-700 active:scale-95"
      title="Reset all localStorage & sessionStorage"
    >
      <Trash2 className="size-3.5" />
      {confirmed ? 'Nochmal klicken!' : 'DEV Reset'}
    </button>
  );
}
