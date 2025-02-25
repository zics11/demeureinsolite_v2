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
      <div className="  max-w-custom mx-auto px-48 my-24">
        <h1 className=" text-6xl font-medium text-center">
          Vivez des séjours uniques en pleine nature, a deux pas de la mer
          méditerranée
        </h1>
      </div>
      <section className=" flex gap-6 max-w-custom mx-auto px-36">
        <div className=" w-1/2">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
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
          <h2 className=" text-xl/none mt-4 font-semibold">
            Maison " Villa cosita " - Gruissan
          </h2>
          <p className=" text-lg text-zinc-600">
            4 personnes - 2 chambres - 1 Salle de bain
          </p>
          <div className=" flex text-lg/none items-center gap-1 text-zinc-600">
            <Sparkles size={18} strokeWidth={2} />
            Jacuzzi privée
          </div>
        </div>
        <div className=" w-1/2">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/IMG_2094.jpg"
                  alt="Demeure insolite logo"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
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
          <h2 className=" text-xl/none mt-4 font-semibold">
            Maison " La forêt " - Durban Corbières
          </h2>
          <p className=" text-lg text-zinc-600">
            6 personnes - 3 chambres - 1 Salle de bain
          </p>
          <div className=" flex text-lg/none items-center gap-1 text-zinc-600">
            <Sparkles size={18} strokeWidth={2} />
            Piscine privée
          </div>
        </div>
      </section>
      <section className=" flex gap-6 max-w-custom mx-auto px-36 mt-6">
        <div className=" w-1/2">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
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
          <h2 className=" text-xl/none mt-4 font-semibold">
            Maison " Villa cosita " - Gruissan
          </h2>
          <p className=" text-lg text-zinc-600">
            4 personnes - 2 chambres - 1 Salle de bain
          </p>
          <div className=" flex text-lg/none items-center gap-1 text-zinc-600">
            <Sparkles size={18} strokeWidth={2} />
            Jacuzzi privée
          </div>
        </div>
        <div className=" w-1/2">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image
                  src="/IMG_2094.jpg"
                  alt="Demeure insolite logo"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
                  width={800} // Remplacez par la largeur réelle de votre image en pixels
                  height={500}
                  priority
                  className="responsive-image rounded-md"
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  src="/IMG_2983.jpg"
                  alt="Demeure insolite logo"
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
          <h2 className=" text-xl/none mt-4 font-semibold">
            Maison " La forêt " - Durban Corbières
          </h2>
          <p className=" text-lg text-zinc-600">
            6 personnes - 3 chambres - 1 Salle de bain
          </p>
          <div className=" flex text-lg/none items-center gap-1 text-zinc-600">
            <Sparkles size={18} strokeWidth={2} />
            Piscine privée
          </div>
        </div>
      </section>
      <section className=" flex gap-12 max-w-custom mx-auto px-48 mt-24 flex-col">
        <h2 className=" text-5xl font-medium text-center">
          Des maisons tout confort trés bien équipées
        </h2>
        <div className=" flex gap-6 ">
          <div className=" flex flex-col items-center w-1/4 gap-3">
            <DoorOpen size={90} strokeWidth={2} />
            <p className=" text-xl"> Arrivée autonome</p>
          </div>
          <div className=" flex flex-col items-center w-1/4 gap-3">
            <HouseWifi size={90} strokeWidth={2} />
            <p className=" text-xl">Wifi rapide</p>
          </div>
          <div className=" flex flex-col items-center w-1/4 gap-3">
            <BedDouble size={90} strokeWidth={2} />
            <p className=" text-xl">Draps et serviettes fournis</p>
          </div>
          <div className=" flex flex-col items-center w-1/4 gap-3">
            <FlameKindling size={90} strokeWidth={2} />
            <p className=" text-xl">Barbecue ou plancha</p>
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
      <section className="max-w-custom mx-auto px-36 mt-24" id="contact-form">
        <div className=" bg-stone-100 p-12 rounded-md">
          <h2 className=" text-5xl font-medium text-center ">
            Réserver ici, sans intermédiaire, sans comission et au&nbsp;
            <span className=" text-foreground font-bold">
              meilleur prix garantie
            </span>
          </h2>
          <Formulaire></Formulaire>
          <div className=" flex gap-6 mt-6">
            <div className=" flex flex-col items-center w-1/3 gap-3">
              <CreditCard size={90} strokeWidth={2} color="#584910" />
              <p className=" text-xl text-background"> Paiement par carte</p>
            </div>
            <div className=" flex flex-col items-center w-1/3 gap-3">
              <LockKeyhole size={90} strokeWidth={2} color="#584910" />
              <p className=" text-xl text-background">sécurisé</p>
            </div>
            <div className=" flex flex-col items-center w-1/3 gap-3">
              <HandCoins size={90} strokeWidth={2} color="#584910" />
              <p className=" text-xl text-background">Meilleur prix garantie</p>
            </div>
          </div>
        </div>
      </section>
      <section
        className=" flex max-w-custom mx-auto px-36 my-24 flex-col"
        id="contact"
      >
        <h2 className=" text-5xl font-medium text-center px-12">
          Une question, contactez nous directement
        </h2>
        <div className=" flex flex-row mt-12">
          <div className=" flex flex-col w-1/2 gap-6 justify-between">
            <a aria-label="Chat on WhatsApp" href="https://wa.me/33646282025">
              <Button variant="outline" size="lg">
                <img
                  alt="Chat on WhatsApp"
                  width={30} // Remplacez par la largeur réelle de votre image en pixels
                  height={5}
                  src="whatsapp-monochrome-icon.svg"
                />
                Chat sur WhatsApp
              </Button>{' '}
            </a>
            <div className=" flex flex-row text-lg font-medium gap-3 items-center">
              <Phone size={32} strokeWidth={2} />+ 33 6 46 28 20 25
            </div>
            <div className=" flex flex-row text-lg font-medium gap-3 items-center">
              <MapPinHouse size={32} strokeWidth={2} />
              30 avenue de Narbonne - 11360 Durban-Corbières
            </div>
            <div className=" flex flex-row text-lg font-medium gap-3 items-center">
              <Mail size={32} strokeWidth={2} />
              demeureinsolite@gmail.com
            </div>
          </div>
          <iframe
            width="100%"
            height="300px"
            className=" rounded-md w-1/2"
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
