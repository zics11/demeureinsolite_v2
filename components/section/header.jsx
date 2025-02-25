import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HousePlus } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className=" flex flex-row  max-w-custom mx-auto justify-center  ">
      <div className=" flex flex-row py-5  mx-12  justify-between border-b-2 w-full ">
        <Link href="/">
          <Image
            className=""
            src="/demeureinsolite.png"
            alt="Demeure insolite logo"
            width={300}
            height={38}
            priority
          />
        </Link>
        <div className=" flex items-center gap-6 font-bold">
          <Link href="#contact">
            <Button variant="ghost" size="lg">
              Contactez nous
            </Button>
          </Link>
          <Link href="#contact-form">
            <Button variant="destructive" size="lg">
              <HousePlus size={48} strokeWidth={2} className=" custom-icon" />
              Réservation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
