'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { HousePlus } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowFloating(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openReservation = () => {
    if (typeof window === 'undefined') return;
    if (typeof window.openFilloutOverlay === 'function') {
      window.openFilloutOverlay();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-custom mx-auto justify-between w-full">
      <div
        className="flex flex-col lg:flex-row py-5 px-6 lg:px-0 lg:mx-12 lg:gap-0 gap-4 justify-between items-center border-b-2 w-full"
        role="navigation"
        aria-label="Menu principal"
      >
        <Link href="/" aria-label="Retour à l'accueil">
          <Image
            className="w-full sm:w-auto"
            src="/demeureinsolite.png"
            alt="Demeure insolite logo"
            width={300}
            height={38}
            priority
          />
        </Link>
        <div className="flex flex-col-reverse lg:flex-row items-center lg:mt-0 mt-3 gap-4 lg:gap-6 font-bold lg:w-auto w-full">
          <Link
            href="#contact"
            aria-label="Aller à la section Contact"
            className="w-full lg:w-auto"
          >
            <Button variant="ghost" size="lg" className="w-full lg:w-auto">
              Contactez nous
            </Button>
          </Link>
          <Button
            onClick={openReservation}
            variant="destructive"
            size="lg"
            className="w-full lg:w-auto"
            aria-label="Ouvrir le formulaire de réservation"
            id="reservation-button"
          >
            <HousePlus size={48} strokeWidth={2} className="custom-icon" />
            Réservation
          </Button>
        </div>
      </div>
      <div
        className={`fixed bottom-10 right-14 z-[9000] transition-opacity duration-100 ${
          showFloating ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Button
          onClick={openReservation}
          variant="destructive"
          size="lg"
          className="w-full lg:w-auto shadow-xl shadow-amber-900/25"
          aria-label="Ouvrir le formulaire de réservation"
        >
          <HousePlus size={48} strokeWidth={2} className="custom-icon" />
          Réservation
        </Button>
      </div>
    </div>
  );
}
