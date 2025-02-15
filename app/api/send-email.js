// app/api/send-email/route.js

import { NextResponse } from 'next/server';
import mailgun from 'mailgun-js';

const mg = mailgun({
  apiKey: '1654a412-90057fdc',
  domain: mg.demeureinsolite.fr,
});

export async function POST(request) {
  const { formData } = await request.json();

  const data = {
    from: 'demeureinsolite@gmail.com', // Remplacez par votre email vérifié sur Mailgun
    to: 'demeureinsolite@gmail.com',
    subject: 'Nouvelle réservation',
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
  };

  try {
    await mg.messages().send(data);
    return NextResponse.json(
      { message: 'Email envoyé avec succès' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 },
    );
  }
}
