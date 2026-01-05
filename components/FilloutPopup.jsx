'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const FILL_OUT_SRC = 'https://server.fillout.com/embed/v1/';
const FILL_OUT_ID = 'jUX3nyPwVaus';

export default function FilloutPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!document.querySelector(`script[src="${FILL_OUT_SRC}"]`)) {
      const script = document.createElement('script');
      script.src = FILL_OUT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    window.openFilloutOverlay = () => setOpen(true);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex justify-end"
      style={{
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-200"
        style={{ opacity: open ? 1 : 0 }}
        onClick={() => setOpen(false)}
      />
      {/* Slider panel */}
      <div
        className="relative h-full bg-white shadow-xl transition-transform duration-200"
        style={{
          width: '440px',
          maxWidth: '100%',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="flex justify-between items-center px-8 py-8 ">
          <h2 className="font-semibold"></h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer le formulaire"
            className="group relative h-10 w-10 flex items-center justify-center"
          >
            <X
              className="h-6 w-6 text-zinc-700 transition-transform duration-200 group-hover:rotate-180"
              strokeWidth={2.25}
            />
          </button>
        </div>
        <div className="p-4">
          <div
            data-fillout-id={FILL_OUT_ID}
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      </div>
    </div>
  );
}
