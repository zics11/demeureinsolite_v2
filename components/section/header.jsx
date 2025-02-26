import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HousePlus } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row max-w-custom mx-auto justify-between w-full">
      <div
        className="flex flex-col md:flex-row py-5 px-6 md:px-0 md:mx-12 md:gap-0 gap-4 justify-between items-center border-b-2 w-full"
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
        <div className="flex flex-col-reverse md:flex-row items-center md:mt-0 mt-3 gap-4 md:gap-6 font-bold md:w-auto w-full">
          <Link
            href="#contact"
            aria-label="Aller à la section Contact"
            className="w-full md:w-auto"
          >
            <Button variant="ghost" size="lg" className="w-full md:w-auto">
              Contactez nous
            </Button>
          </Link>
          <Link
            href="#contact-form"
            aria-label="Accéder au formulaire de réservation"
            className="w-full md:w-auto"
          >
            <Button
              variant="destructive"
              size="lg"
              className="w-full md:w-auto"
            >
              <HousePlus size={48} strokeWidth={2} className="custom-icon" />
              Réservation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
