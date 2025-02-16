// app/api/send-email/route.js

import { NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

export async function POST(request) {
  const { formData } = await request.json();

  const emailData = {
    from: 'Réservation en direct demeeureinsolite.fr <mailgun@sandbox1c6bb2f9e7da41cc9b7bb8f1b9f75fba.mailgun.org>', // Change this to your Mailgun verified email
    to: ['demeureinsolite@gmail.com'], // Destination email
    subject: '✅ Nouvelle réservation depuis demeeureinsolite.fr',
    text: `
      Date d'arrivée: ${formData.arrivalDate}
      Date de départ: ${formData.departureDate}
      Maison: ${formData.house}
      Prénom: ${formData.firstName}
      Nom: ${formData.lastName}
      Adresse: ${formData.address}
      Email: ${formData.email}
      Téléphone: ${formData.phone}
      Nombre de personnes: ${formData.numberOfPeople}
      Message: ${formData.message}
    `,
    html: `<h1>Nouvelle réservation</h1>
           <p>Date d'arrivée: ${formData.arrivalDate}</p>
           <p>Date de départ: ${formData.departureDate}</p>
           <p>Maison: ${formData.house}</p>
           <p>Prénom: ${formData.firstName}</p>
           <p>Nom: ${formData.lastName}</p>
           <p>Adresse: ${formData.address}</p>
           <p>Email: ${formData.email}</p>
           <p>Téléphone: ${formData.phone}</p>
           <p>Nombre de personnes: ${formData.numberOfPeople}</p>
           <p>Message: ${formData.message}</p>`,
  };

  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);
    console.log(msg); // logs response data
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
