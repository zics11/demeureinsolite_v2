// app/api/send-email/route.js

import { NextResponse } from 'next/server';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

// Always run on the server at request time; never evaluated/prerendered at build.
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { formData } = await request.json();

  console.log('🔍 Données reçues:', formData);

  // Lazily instantiate the Mailgun client at request time so the build does
  // not require MAILGUN_API_KEY (secrets are injected at runtime, not baked).
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
  });

  const emailData = {
    from: 'demeureinsolite.fr <mailgun@sandbox1c6bb2f9e7da41cc9b7bb8f1b9f75fba.mailgun.org>',
    to: ['demeureinsolite@gmail.com'],
    subject: '✅ Nouvelle demande depuis demeureinsolite.fr',
    text: `
    Date d'arrivée: ${formData.arrivalDate}
    Date de départ: ${formData.departureDate}
    Maison: ${formData.house}
    Prénom: ${formData.firstName}
    Nom: ${formData.lastName}
    Adresse: ${formData.address}
    Email: ${formData.email}
    Téléphone: ${formData.phone}
    Nombre d'adultes: ${formData.numberOfPeople}
    Nombre d'enfants: ${formData.numberOfChildren}
    Nombre de bébé: ${formData.numberOfBebe}
    Animaux: ${formData.pets}
    Message: ${formData.message}
  `,
    html: `<h1>Nouvelle demande depuis demeureinsolite.fr</h1>
  <p>Date d'arrivée: ${formData.arrivalDate}</p>
  <p>Date de départ: ${formData.departureDate}</p>
  <p>Maison: ${formData.house}</p>
  <p>Prénom: ${formData.firstName}</p>
  <p>Nom: ${formData.lastName}</p>
  <p>Adresse: ${formData.address}</p>
  <p>Email: ${formData.email}</p>
  <p>Téléphone: ${formData.phone}</p>
  <p>Nombre d'adultes: ${formData.numberOfPeople}</p>
  <p>Nombre d'enfants: ${formData.numberOfChildren}</p>
  <p>Nombre de bébé: ${formData.numberOfBebe}</p>
  <p>Animaux: ${formData.pets}</p>
  <p>Message: ${formData.message}</p>`,
  };

  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);
    console.log(msg);
    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erreur Mailgun: ', error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email", details: error },
      { status: 500 },
    );
  }
}
