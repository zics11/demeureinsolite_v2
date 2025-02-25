import Image from 'next/image';
import Header from '@/components/section/header';
import Footer from '@/components/section/footer';

import Formulaire from '@/components/section/formulaire';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  DoorOpen,
  HouseWifi,
  BedDouble,
  FlameKindling,
  CreditCard,
  LockKeyhole,
  HandCoins,
  Phone,
  Mail,
  MapPinHouse,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="">
      <Header></Header>
      <div className="  max-w-custom mx-auto px-6 md:px-48 my-12 md:my-36">
        <h1 className=" md:text-6xl text-2xl font-semibold text-center">
          Vivez des séjours uniques en pleine nature, a deux pas de la mer
          méditerranée
        </h1>
      </div>
      <section className="flex flex-col md:flex-row gap-6 max-w-custom mx-auto px-6 md:px-36 md:mt-36">
        <div className="w-full md:w-1/2">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/maisons/1/1.jpeg"
                  alt="Photo Maison Villa Cosita - Gruissan"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/1/2.jpeg"
                  alt="Photo Maison Villa Cosita - Gruissan"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/1/3.jpeg"
                  alt="Photo Maison Villa Cosita - Gruissan"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/1/4.jpeg"
                  alt="Photo Maison Villa Cosita - Gruissan"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/1/5.jpeg"
                  alt="Photo Maison Villa Cosita - Gruissan"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/1/6.jpeg"
                  alt="Photo Maison Villa Cosita - Gruissan"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/1/7.jpeg"
                  alt="Photo Maison Villa Cosita - Gruissan"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/1/8.jpeg"
                  alt="Photo Maison Villa Cosita - Gruissan"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <h2 className=" md:text-xl/none mt-4 font-semibold">
            Maison " Villa cosita " - Gruissan
          </h2>
          <p className=" md:text-lg text-zinc-600">
            4 personnes - 2 chambres - 1 Salle de bain
          </p>
          <div className=" flex md:text-lg/none items-center gap-1 text-zinc-600">
            <Sparkles size={18} strokeWidth={2} />
            Jacuzzi privé
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/maisons/2/1 - Moyenne.jpeg"
                  alt="Photo Maison La forêt - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/2/2 - Moyenne.jpeg"
                  alt="Photo Maison La forêt - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/2/3 - Moyenne.jpeg"
                  alt="Photo Maison La forêt - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/2/4 - Moyenne.jpeg"
                  alt="Photo Maison La forêt - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/2/5 - Moyenne.jpeg"
                  alt="Photo Maison La forêt - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/2/6 - Moyenne.jpeg"
                  alt="Photo Maison La forêt - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/2/7 - Moyenne.jpeg"
                  alt="Photo Maison La forêt - Durban Corbières"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/2/8 - Moyenne.jpeg"
                  alt="Photo Maison La forêt - Durban Corbières"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <h2 className=" md:text-xl/none mt-4 font-semibold">
            Maison " La forêt " - Durban Corbières
          </h2>
          <p className=" md:text-lg text-zinc-600">
            6 personnes - 3 chambres - 1 Salle de bain
          </p>
          <div className=" flex md:text-lg/none items-center gap-1 text-zinc-600">
            <Sparkles size={18} strokeWidth={2} />
            Piscine privée
          </div>
        </div>
      </section>
      <section className=" flex flex-col md:flex-row gap-6 max-w-custom mx-auto px-6 md:px-36 mt-6">
        <div className="w-full md:w-1/2">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/maisons/3/1 - Moyenne.jpeg"
                  alt="Photo Maison Horizon - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/3/2 - Moyenne.jpeg"
                  alt="Photo Maison Horizon - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/3/3 - Moyenne.jpeg"
                  alt="Photo Maison Horizon - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/3/4 - Moyenne.jpeg"
                  alt="Photo Maison Horizon - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/3/5 - Moyenne.jpeg"
                  alt="Photo Maison Horizon - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/3/6 - Moyenne.jpeg"
                  alt="Photo Maison Horizon - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/3/7 - Moyenne.jpeg"
                  alt="Photo Maison Horizon - Durban Corbières"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/3/8 - Moyenne.jpeg"
                  alt="Photo Maison Horizon - Durban Corbières"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <h2 className=" md:text-xl/none mt-4 font-semibold">
            Maison " Horizon " - Durban Corbières
          </h2>
          <p className=" md:text-lg text-zinc-600">
            6 personnes - 3 chambres - 2 Salles de bains
          </p>
          <div className=" flex md:text-lg/none items-center gap-1 text-zinc-600">
            <Sparkles size={18} strokeWidth={2} />
            Piscine privée
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/maisons/4/1 - Moyenne.jpeg"
                  alt="Photo Maison La Cabane - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/4/2 - Moyenne.jpeg"
                  alt="Photo Maison La Cabane - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/4/3 - Moyenne.jpeg"
                  alt="Photo Maison La Cabane - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/4/4 - Moyenne.jpeg"
                  alt="Photo Maison La Cabane - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/4/5 - Moyenne.jpeg"
                  alt="Photo Maison La Cabane - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/4/6 - Moyenne.jpeg"
                  alt="Photo Maison La Cabane - Durban Corbières"
                  width={800}
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/4/7 - Moyenne.jpeg"
                  alt="Photo Maison La Cabane - Durban Corbières"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/maisons/4/8 - Moyenne.jpeg"
                  alt="Photo Maison La Cabane - Durban Corbières"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <h2 className=" md:text-xl/none mt-4 font-semibold">
            Maison " La cabane " - Durban Corbières
          </h2>
          <p className=" md:text-lg text-zinc-600">
            4 personnes - 2 chambres - 1 Salle de bain
          </p>
          <div className=" flex md:text-lg/none items-center gap-1 text-zinc-600">
            <Sparkles size={18} strokeWidth={2} />
            Mur vitré panoramique
          </div>
        </div>
      </section>
      <section className=" flex gap-12 max-w-custom mx-auto px-6 md:px-48 mt-12 md:mt-36 flex-col">
        <h2 className=" text-xl md:text-5xl font-medium text-center">
          Des maisons tout confort très bien équipées
        </h2>
        <div className=" flex flex-col md:flex-row items-center gap-6 ">
          <div className=" flex flex-col items-center w-1/4 gap-3">
            <DoorOpen size={90} strokeWidth={2} />
            <p className=" md:text-xl text-center"> Arrivée autonome</p>
          </div>
          <div className=" flex flex-col items-center w-1/4 gap-3">
            <HouseWifi size={90} strokeWidth={2} />
            <p className=" md:text-xl text-center"> Wifi rapide</p>
          </div>
          <div className=" flex flex-col items-center w-1/4 gap-3">
            <BedDouble size={90} strokeWidth={2} />
            <p className=" md:text-xl text-center">
              Draps et serviettes fournis
            </p>
          </div>
          <div className=" flex flex-col items-center w-1/4 gap-3">
            <FlameKindling size={90} strokeWidth={2} />
            <p className=" md:text-xl text-center"> Barbecue ou plancha</p>
          </div>
        </div>
        <p>
          Évadez-vous au cœur du Languedoc, dans le Sud de la France, et
          découvrez un monde où nature préservée et charme authentique se
          rencontrent. Chez Demeure Insolite, nous vous proposons des
          hébergements uniques en pleine nature, à deux pas de la Méditerranée.
          <br></br> <br></br>Chaque demeure est conçue pour offrir une
          expérience inoubliable, alliant confort moderne et ambiance
          chaleureuse. Profitez de la diversité des loisirs qu'offre notre
          région ensoleillée : détendez-vous sur les plages méditerranéennes,
          explorez des villes historiques, ou partez en randonnée dans nos
          magnifiques paysages.<br></br> <br></br>Découvrez également notre
          remarquable cuisine locale et nos vins de classe mondiale, dans des
          bistrots simples ou des restaurants étoilés au Michelin.<br></br>{' '}
          <br></br>Plongez dans votre piscine ou détendez-vous dans notre
          jacuzzi en admirant la vue magnifique.<br></br>
          <br></br> Chez Demeure Insolite, chaque détail est pensé pour vous
          offrir une expérience authentique et mémorable. Nous avons hâte de
          vous accueillir et de vous faire découvrir toutes les merveilles de
          notre belle région.<br></br>
          <br></br> Bienvenue chez nous, bienvenue chez vous.
        </p>
      </section>
      <section
        className="max-w-custom mx-auto md:px-36 mt-12 md:mt-24"
        id="contact-form"
      >
        <div className=" bg-stone-100 p-6 md:p-12 rounded-md">
          <h2 className=" text-xl md:text-5xl font-medium text-center ">
            Réserver ici, sans intermédiaire, sans comission et au&nbsp;
            <span className=" text-foreground font-bold">
              meilleur prix garantie
            </span>
          </h2>
          <Formulaire></Formulaire>
          <div className=" flex gap-6 mt-6">
            <div className=" flex flex-col items-center w-1/3 gap-3">
              <CreditCard size={90} strokeWidth={2} color="#584910" />
              <p className=" md:text-xl text-background text-center">
                {' '}
                Paiement par carte
              </p>
            </div>
            <div className=" flex flex-col items-center w-1/3 gap-3">
              <LockKeyhole size={90} strokeWidth={2} color="#584910" />
              <p className=" md:text-xl text-background text-center">
                Sécurisé
              </p>
            </div>
            <div className=" flex flex-col items-center w-1/3 gap-3">
              <HandCoins size={90} strokeWidth={2} color="#584910" />
              <p className=" md:text-xl text-background text-center">
                Meilleur prix garanti
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className=" flex max-w-custom mx-auto px-6 md:px-36 my-12 md:my-36 flex-col"
        id="contact"
      >
        <h2 className=" text-xl md:text-5xl font-medium text-center px-12">
          Une question ? Contactez-nous directement
        </h2>
        <div className=" flex flex-col md:flex-row mt-12 gap-6 md:gap-0">
          <div className=" flex flex-col md:w-1/2 gap-6 justify-between">
            <a aria-label="Chat on WhatsApp" href="https://wa.me/33646282025">
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                <img
                  alt="Chat on WhatsApp"
                  width={30} // Remplacez par la largeur réelle de votre image en pixels
                  height={5}
                  src="whatsapp-monochrome-icon.svg"
                />
                Chat sur WhatsApp
              </Button>{' '}
            </a>
            <div className=" flex flex-row md:text-lg font-medium gap-3 items-center">
              <Phone size={32} strokeWidth={2} />+ 33 6 46 28 20 25
            </div>
            <div className=" flex flex-row md:text-lg font-medium gap-3 items-center">
              <MapPinHouse size={32} strokeWidth={2} />
              30 avenue de Narbonne - 11360 Durban-Corbières
            </div>
            <div className=" flex flex-row md:text-lg font-medium gap-3 items-center">
              <Mail size={32} strokeWidth={2} />
              demeureinsolite@gmail.com
            </div>
          </div>
          <iframe
            width="100%"
            height="300px"
            className=" rounded-md md:w-1/2"
            src="//umap.openstreetmap.fr/fr/map/carte-sans-nom_1181187?scaleControl=false&miniMap=false&scrollWheelZoom=true&zoomControl=false&editMode=disabled&moreControl=false&searchControl=false&tilelayersControl=false&embedControl=false&datalayersControl=false&onLoadPanel=none&captionBar=false&captionMenus=false&fullscreenControl=false&captionControl=false&locateControl=false&measureControl=false&editinosmControl=false&starControl=false"
          ></iframe>
        </div>
      </section>
      <section className=" ">
        <Footer></Footer>
      </section>
    </div>
  );
}
