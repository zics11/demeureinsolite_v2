import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HousePlus } from 'lucide-react';

export default function Header() {
  return (
    <div className=" flex flex-row py-5 justify-between ">
      <Image
        className=""
        src="/demeureinsolite.png"
        alt="Demeure insolite logo"
        width={300}
        height={38}
        priority
      />
      <div className=" flex items-center gap-6 font-bold">
        <Button variant="ghost" size="lg">
          Contactez nous
        </Button>
        <Button variant="destructive" size="lg">
          <HousePlus size={48} strokeWidth={2} className=" custom-icon" />
          Réservation
        </Button>
      </div>
    </div>
  );
}
