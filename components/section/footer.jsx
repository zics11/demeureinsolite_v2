import { HousePlus, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className=" flex flex-row  max-w-custom mx-auto justify-center  ">
      <div className=" flex flex-col md:flex-row py-5 px-6 md:px-0  md:mx-12  justify-between border-t-2 w-full md:gap-0 gap-6 items-center ">
        <div className=" flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <p className=" text-center md:text-left">© Demeure insolite</p>
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
    </div>
  );
}
