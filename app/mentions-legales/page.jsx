import Header from '@/components/section/header';
import Footer from '@/components/section/footer';

export default function MentionsLegales() {
  return (
    <main className="">
      <Header></Header>
      <div className="  max-w-custom mx-auto px-48 my-24">
        <h1 className="text-3xl font-bold mb-4">Mentions Légales</h1>

        <h2 className="text-2xl font-semibold mt-6">1. Éditeur du site</h2>
        <p>
          <strong>Nom de l’entreprise :</strong> Demeure Insolite
        </p>
        <p>
          <strong>Statut juridique :</strong> Micro-entreprise
        </p>
        <p>
          <strong>SIRET :</strong> 92147212200016
        </p>
        <p>
          <strong>Responsable de publication :</strong> Ursula Valiente Andreu
        </p>
        <p>
          <strong>Adresse :</strong> 30 avenue de Narbonne 11360
          Durban-Corbières
        </p>
        <p>
          <strong>Téléphone :</strong> 0646282025
        </p>
        <p>
          <strong>Email :</strong>
          <a href="mailto:demeureinsolite@gmail.com">
            demeureinsolite@gmail.com
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. Hébergement du site</h2>
        <p>
          <strong>Hébergeur :</strong> Ursula Valiente
        </p>
        <p>
          <strong>Adresse :</strong> 30 avenue de Narbonne 11360
          Durban-Corbières
        </p>
        <p>
          <strong>Téléphone :</strong> 0646282025
        </p>

        <h2 className="text-2xl font-semibold mt-6">3. Activité</h2>
        <p>
          Demeure Insolite est une autoentreprise spécialisée dans la
          <strong>location de gîte</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          4. Propriété intellectuelle
        </h2>
        <p>
          Tout le contenu du site <strong>demeureinsolite.fr</strong> (textes,
          images, graphismes, logo, etc.) est protégé par les lois sur la
          propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, même partielle, est interdite sans l’autorisation
          de l’éditeur.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Données personnelles</h2>
        <p>
          Conformément au <strong>RGPD</strong>, les informations collectées via
          le site sont utilisées uniquement pour la gestion des réservations et
          la communication avec les clients.
        </p>
        <p>
          L’utilisateur dispose d’un droit d’accès, de modification et de
          suppression de ses données personnelles en contactant :
          <a href="mailto:demeureinsolite@gmail.com">
            demeureinsolite@gmail.com
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Cookies</h2>
        <p>
          Le site peut utiliser des cookies pour améliorer l’expérience
          utilisateur. L’utilisateur peut configurer son navigateur pour refuser
          les cookies.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Responsabilité</h2>
        <p>
          L’éditeur ne peut être tenu responsable en cas d’indisponibilité
          temporaire du site ou d'erreurs dans les informations fournies.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Droit applicable</h2>
        <p>
          Les présentes mentions légales sont soumises au droit français. En cas
          de litige, les tribunaux compétents seront ceux du ressort de
          l’autoentreprise.
        </p>
      </div>
      <section className=" bg-background ">
        <Footer></Footer>
      </section>
    </main>
  );
}
