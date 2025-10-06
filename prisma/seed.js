/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function addDays(date, amount) {
  return new Date(date.getTime() + amount * DAY_IN_MS);
}

function toISODate(date) {
  const d = new Date(date.getTime());
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function diffInNights(start, end) {
  const diff = Math.round((end.getTime() - start.getTime()) / DAY_IN_MS);
  return Math.max(diff, 1);
}

async function ensureReservation(listingId, data) {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const nights = diffInNights(startDate, endDate);

  await prisma.reservation.upsert({
    where: { id: data.id },
    update: {
      ...data,
      startDate,
      endDate,
      nights,
    },
    create: {
      ...data,
      listingId,
      startDate,
      endDate,
      nights,
    },
  });
}

async function main() {
  const now = new Date();
  const listings = [
    {
      slug: 'villa-cosita',
      title: 'Villa Cosita - Gruissan',
      subtitle: 'Maison cosy avec jacuzzi privé',
      description:
        'Villa Cosita vous accueille à Gruissan avec un jacuzzi privé, deux chambres et une ambiance chaleureuse à deux pas de la Méditerranée.',
      baseRateCents: 19000,
      cleaningFeeCents: 6000,
      maxGuests: 4,
    },
    {
      slug: 'la-foret',
      title: 'La Forêt - Durban Corbières',
      subtitle: 'Cabane insolite au coeur de la nature',
      description:
        'Retraite en pleine nature avec bain nordique, idéale pour une escapade romantique ou un séjour detox sans vis-à-vis.',
      baseRateCents: 21000,
      cleaningFeeCents: 7500,
      maxGuests: 2,
    },
  ];

  for (const listing of listings) {
    const created = await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: {
        title: listing.title,
        subtitle: listing.subtitle,
        description: listing.description,
        baseRateCents: listing.baseRateCents,
        cleaningFeeCents: listing.cleaningFeeCents,
        maxGuests: listing.maxGuests,
      },
      create: listing,
    });

    const blackoutStart = toISODate(addDays(now, 14));
    const blackoutEnd = toISODate(addDays(blackoutStart, 2));
    await prisma.blackoutRange.upsert({
      where: {
        listingId_startDate_endDate: {
          listingId: created.id,
          startDate: blackoutStart,
          endDate: blackoutEnd,
        },
      },
      update: {},
      create: {
        listingId: created.id,
        startDate: blackoutStart,
        endDate: blackoutEnd,
        reason: 'Maintenance planifiée',
      },
    });

    const reservationStart = toISODate(addDays(now, 35));
    const reservationEnd = toISODate(addDays(reservationStart, 4));
    await ensureReservation(created.id, {
      id: `${listing.slug}-sample-res`,
      status: 'CONFIRMED',
      startDate: reservationStart.toISOString(),
      endDate: reservationEnd.toISOString(),
      totalAmountCents: listing.baseRateCents * 4 + listing.cleaningFeeCents,
      guestName: 'John Doe',
      guestEmail: 'john.doe@example.com',
      guestPhone: '+33123456789',
      adults: 2,
      children: 0,
      notes: 'Réservation de démonstration',
    });

    const highSeasonStart = toISODate(addDays(now, 60));
    for (let i = 0; i < 5; i += 1) {
      const date = toISODate(addDays(highSeasonStart, i));
      await prisma.rateOverride.upsert({
        where: {
          listingId_date: {
            listingId: created.id,
            date,
          },
        },
        update: {
          priceCents: listing.baseRateCents + 5000,
        },
        create: {
          listingId: created.id,
          date,
          priceCents: listing.baseRateCents + 5000,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
