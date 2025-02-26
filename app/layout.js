import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Hébergements uniques en Occitanie en pleine nature',
  description:
    "Profitez d'un séjour unique en Occitanie avec nos hébergements. Découvrez la nature, les plages, et la gastronomie locale.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>
          Hébergements uniques en Occitanie en pleine nature, a deux pas de la
          mer méditerranée | Demeure Insolite
        </title>
        <meta
          name="description"
          content="Découvrez nos hébergements uniques en Occitanie. Profitez du soleil, des plages, des sports nautiques et de la gastronomie locale dans un cadre authentique et naturel. Réservez dès maintenant !"
        />
        <meta
          name="keywords"
          content="hébergements insolites, Occitanie, villas, tipis, nature, tourisme de luxe, vacances en famille, vacances en couple, tourisme authentique, sud de la France"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Hébergements uniques en Occitanie - Demeure Insolite"
        />
        <meta
          property="og:description"
          content="Profitez d'un séjour unique en Occitanie avec nos hébergements. Découvrez la nature, les plages, et la gastronomie locale."
        />
        <meta property="og:image" content="URL_DE_VOTRE_IMAGE" />
        <meta property="og:url" content="https://www.demeureinsolite.fr" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hébergements uniques en Occitanie - Demeure Insolite"
        />
        <meta
          name="twitter:description"
          content="Séjour unique en Occitanie avec nos hébergements. Profitez de la nature et de la gastronomie locale."
        />
        <meta name="twitter:image" content="URL_DE_VOTRE_IMAGE" />
        <link rel="canonical" href="https://www.demeureinsolite.fr" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
