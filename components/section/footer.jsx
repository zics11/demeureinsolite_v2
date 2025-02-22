import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HousePlus, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className=" flex flex-row py-5 max-w-custom mx-auto px-12 justify-between text-stone-50 items-center ">
      <div className=" flex items-center gap-12">
        <p>© Demeure insolite - Toutes reproduction interdite</p>
        <Link href="/mentions-legales">
          <p>Mentions légales</p>
        </Link>
      </div>

      <div className=" flex items-center gap-6 font-bold">
        <a href="https://www.instagram.com/demeureinsolite.11/">
          <Instagram size={48} strokeWidth={2} />
        </a>
        <a href="https://www.facebook.com/demeureinsolite">
          <Facebook size={48} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
