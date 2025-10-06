import {
  addDays,
  eachDayOfInterval,
  differenceInCalendarDays,
  isBefore,
} from 'date-fns';
import prisma from './prisma';

export const RESERVATION_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
};

const VALID_RESERVATION_STATUSES = new Set(
  Object.values(RESERVATION_STATUS),
);

function toDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.valueOf())) {
    throw new Error('INVALID_DATE');
  }
  return normalize(date);
}

function normalize(date) {
  const normalized = new Date(date.getTime());
  normalized.setUTCHours(0, 0, 0, 0);
  return normalized;
}

function formatDateKey(date) {
  return normalize(date).toISOString().slice(0, 10);
}

function rangesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

export function calculateNights(startDate, endDate) {
  const start = toDate(startDate);
  const end = toDate(endDate);
  if (!isBefore(start, end)) {
    throw new Error('START_AFTER_END');
  }
  return differenceInCalendarDays(end, start);
}

export async function listListings() {
  return prisma.listing.findMany({
    orderBy: { title: 'asc' },
  });
}

export async function getListingBySlug(slug) {
  return prisma.listing.findUnique({
    where: { slug },
  });
}

export async function requireListingBySlug(slug) {
  const listing = await getListingBySlug(slug);
  if (!listing) {
    const error = new Error('LISTING_NOT_FOUND');
    error.code = 'LISTING_NOT_FOUND';
    throw error;
  }
  return listing;
}

export async function getListingById(id) {
  return prisma.listing.findUnique({ where: { id } });
}

export async function requireListingById(id) {
  const listing = await getListingById(id);
  if (!listing) {
    const error = new Error('LISTING_NOT_FOUND');
    error.code = 'LISTING_NOT_FOUND';
    throw error;
  }
  return listing;
}

export async function getListingWithRelations(slug) {
  return prisma.listing.findUnique({
    where: { slug },
    include: {
      reservations: true,
      rateOverrides: true,
      blackoutRanges: true,
    },
  });
}

async function fetchCalendars(prismaClient, listingId, start, end) {
  const [reservations, blackoutRanges, rateOverrides] = await Promise.all([
    prismaClient.reservation.findMany({
      where: {
        listingId,
        status: { not: RESERVATION_STATUS.CANCELLED },
        startDate: { lt: end },
        endDate: { gt: start },
      },
      orderBy: { startDate: 'asc' },
    }),
    prismaClient.blackoutRange.findMany({
      where: {
        listingId,
        startDate: { lt: addDays(end, 1) },
        endDate: { gt: addDays(start, -1) },
      },
      orderBy: { startDate: 'asc' },
    }),
    prismaClient.rateOverride.findMany({
      where: {
        listingId,
        date: {
          gte: start,
          lt: end,
        },
      },
    }),
  ]);

  const overrideMap = new Map(
    rateOverrides.map((override) => [formatDateKey(override.date), override]),
  );

  return { reservations, blackoutRanges, overrideMap };
}

export async function getAvailabilityForRange(listing, params) {
  const start = toDate(params.startDate);
  const end = toDate(params.endDate);

  if (!isBefore(start, end)) {
    throw new Error('DATE_RANGE_INVALID');
  }

  const nights = differenceInCalendarDays(end, start);
  if (nights > 60) {
    throw new Error('DATE_RANGE_TOO_LONG');
  }

  const days = eachDayOfInterval({
    start,
    end: addDays(end, -1),
  });

  const { reservations, blackoutRanges, overrideMap } = await fetchCalendars(
    prisma,
    listing.id,
    start,
    end,
  );

  const availability = days.map((day) => {
    const dateKey = formatDateKey(day);
    const override = overrideMap.get(dateKey);
    const priceCents = override ? override.priceCents : listing.baseRateCents;

    const reservation = reservations.find((res) =>
      rangesOverlap(
        normalize(res.startDate),
        normalize(res.endDate),
        day,
        addDays(day, 1),
      ),
    );

    const blackout = blackoutRanges.find((range) =>
      rangesOverlap(
        normalize(range.startDate),
        addDays(normalize(range.endDate), 1),
        day,
        addDays(day, 1),
      ),
    );

    if (reservation) {
      return {
        date: dateKey,
        available: false,
        priceCents,
        reason: 'RESERVED',
        reservationId: reservation.id,
        reservationStatus: reservation.status,
      };
    }

    if (blackout) {
      return {
        date: dateKey,
        available: false,
        priceCents,
        reason: 'BLACKOUT',
        blackoutId: blackout.id,
      };
    }

    return {
      date: dateKey,
      available: true,
      priceCents,
    };
  });

  return {
    listing,
    availability,
  };
}

export async function calculatePricing(prismaClient, listing, startDate, endDate) {
  const start = toDate(startDate);
  const end = toDate(endDate);

  if (!isBefore(start, end)) {
    throw new Error('DATE_RANGE_INVALID');
  }

  const nights = differenceInCalendarDays(end, start);

  if (nights < 1) {
    throw new Error('DATE_RANGE_INVALID');
  }

  const days = eachDayOfInterval({
    start,
    end: addDays(end, -1),
  });

  const { overrideMap } = await fetchCalendars(prismaClient, listing.id, start, end);

  const nightlyRates = days.map((day) => {
    const key = formatDateKey(day);
    const override = overrideMap.get(key);
    return {
      date: key,
      priceCents: override ? override.priceCents : listing.baseRateCents,
    };
  });

  const subtotalCents = nightlyRates.reduce(
    (sum, rate) => sum + rate.priceCents,
    0,
  );

  const totalAmountCents = subtotalCents + listing.cleaningFeeCents;

  return {
    nights,
    nightlyRates,
    subtotalCents,
    cleaningFeeCents: listing.cleaningFeeCents,
    totalAmountCents,
  };
}

export async function assertAvailability(prismaClient, listingId, startDate, endDate) {
  const start = toDate(startDate);
  const end = toDate(endDate);

  const [reservation, blackout] = await Promise.all([
    prismaClient.reservation.findFirst({
      where: {
        listingId,
        status: { not: RESERVATION_STATUS.CANCELLED },
        startDate: { lt: end },
        endDate: { gt: start },
      },
    }),
    prismaClient.blackoutRange.findFirst({
      where: {
        listingId,
        startDate: { lt: addDays(end, 1) },
        endDate: { gt: addDays(start, -1) },
      },
    }),
  ]);

  if (reservation) {
    const error = new Error('DATES_ALREADY_RESERVED');
    error.code = 'DATES_ALREADY_RESERVED';
    throw error;
  }

  if (blackout) {
    const error = new Error('DATES_BLOCKED');
    error.code = 'DATES_BLOCKED';
    throw error;
  }
}

export async function createReservation({
  listing,
  payload,
}) {
  const startDate = toDate(payload.startDate);
  const endDate = toDate(payload.endDate);

  if (
    payload.status &&
    !VALID_RESERVATION_STATUSES.has(payload.status)
  ) {
    const error = new Error('RESERVATION_STATUS_INVALID');
    error.code = 'RESERVATION_STATUS_INVALID';
    throw error;
  }

  return prisma.$transaction(async (tx) => {
    await assertAvailability(tx, listing.id, startDate, endDate);

    const pricing = await calculatePricing(tx, listing, startDate, endDate);

    const reservation = await tx.reservation.create({
      data: {
        listingId: listing.id,
        status: payload.status || RESERVATION_STATUS.PENDING,
        startDate,
        endDate,
        nights: pricing.nights,
        totalAmountCents: pricing.totalAmountCents,
        guestName: payload.guestName,
        guestEmail: payload.guestEmail,
        guestPhone: payload.guestPhone ?? null,
        adults: payload.adults ?? 1,
        children: payload.children ?? 0,
        notes: payload.notes ?? null,
      },
    });

    return {
      reservation,
      pricing,
    };
  });
}

export async function updateReservation(id, data) {
  const reservation = await prisma.reservation.findUnique({ where: { id } });
  if (!reservation) {
    const error = new Error('RESERVATION_NOT_FOUND');
    error.code = 'RESERVATION_NOT_FOUND';
    throw error;
  }

  if (data.status && !VALID_RESERVATION_STATUSES.has(data.status)) {
    const error = new Error('RESERVATION_STATUS_INVALID');
    error.code = 'RESERVATION_STATUS_INVALID';
    throw error;
  }

  const startDate = data.startDate ? toDate(data.startDate) : reservation.startDate;
  const endDate = data.endDate ? toDate(data.endDate) : reservation.endDate;

  return prisma.$transaction(async (tx) => {
    if (data.startDate || data.endDate) {
      await assertAvailability(tx, reservation.listingId, startDate, endDate);
    }

    const listing = await tx.listing.findUnique({
      where: { id: reservation.listingId },
    });

    const pricing = await calculatePricing(tx, listing, startDate, endDate);

    const updated = await tx.reservation.update({
      where: { id },
      data: {
        status: data.status ?? reservation.status,
        startDate,
        endDate,
        nights: pricing.nights,
        totalAmountCents: pricing.totalAmountCents,
        guestName: data.guestName ?? reservation.guestName,
        guestEmail: data.guestEmail ?? reservation.guestEmail,
        guestPhone: data.guestPhone ?? reservation.guestPhone,
        adults: data.adults ?? reservation.adults,
        children: data.children ?? reservation.children,
        notes: data.notes ?? reservation.notes,
      },
    });

    return {
      reservation: updated,
      pricing,
    };
  });
}

export async function deleteReservation(id) {
  await prisma.reservation.delete({ where: { id } });
}

export async function createRateOverrides(listingId, startDate, endDate, priceCents) {
  const start = toDate(startDate);
  const end = toDate(endDate);

  if (!isBefore(start, end)) {
    throw new Error('DATE_RANGE_INVALID');
  }

  const days = eachDayOfInterval({
    start,
    end: addDays(end, -1),
  });

  return prisma.$transaction(async (tx) => {
    const results = [];
    for (const day of days) {
      const date = normalize(day);
      const override = await tx.rateOverride.upsert({
        where: {
          listingId_date: {
            listingId,
            date,
          },
        },
        update: { priceCents },
        create: {
          listingId,
          date,
          priceCents,
        },
      });
      results.push(override);
    }
    return results;
  });
}

export async function deleteRateOverride(listingId, date) {
  const normalized = toDate(date);
  await prisma.rateOverride.delete({
    where: {
      listingId_date: {
        listingId,
        date: normalized,
      },
    },
  });
}

export async function createBlackout(listingId, startDate, endDate, reason) {
  const start = toDate(startDate);
  const end = toDate(endDate);

  if (!isBefore(start, end)) {
    throw new Error('DATE_RANGE_INVALID');
  }

  const overlap = await prisma.blackoutRange.findFirst({
    where: {
      listingId,
      startDate: { lt: addDays(end, 1) },
      endDate: { gt: addDays(start, -1) },
    },
  });

  if (overlap) {
    const error = new Error('BLACKOUT_OVERLAP');
    error.code = 'BLACKOUT_OVERLAP';
    throw error;
  }

  return prisma.blackoutRange.create({
    data: {
      listingId,
      startDate: start,
      endDate: end,
      reason: reason ?? null,
    },
  });
}

export async function deleteBlackout(id) {
  await prisma.blackoutRange.delete({ where: { id } });
}

export function buildReservationResponse(reservation) {
  return {
    ...reservation,
    startDate: reservation.startDate.toISOString(),
    endDate: reservation.endDate.toISOString(),
    createdAt: reservation.createdAt.toISOString(),
    updatedAt: reservation.updatedAt.toISOString(),
  };
}

export function formatPricing(pricing) {
  return {
    ...pricing,
    nightlyRates: pricing.nightlyRates,
  };
}

export function serializeListing(listing) {
  return {
    ...listing,
    createdAt: listing.createdAt?.toISOString?.() ?? listing.createdAt,
    updatedAt: listing.updatedAt?.toISOString?.() ?? listing.updatedAt,
  };
}

export function serializeRateOverride(override) {
  return {
    ...override,
    date: override.date.toISOString(),
    createdAt: override.createdAt?.toISOString?.() ?? override.createdAt,
    updatedAt: override.updatedAt?.toISOString?.() ?? override.updatedAt,
  };
}

export function serializeBlackout(range) {
  return {
    ...range,
    startDate: range.startDate.toISOString(),
    endDate: range.endDate.toISOString(),
    createdAt: range.createdAt?.toISOString?.() ?? range.createdAt,
    updatedAt: range.updatedAt?.toISOString?.() ?? range.updatedAt,
  };
}

export async function fetchListingsWithAdminData() {
  const listings = await prisma.listing.findMany({
    orderBy: { title: 'asc' },
    include: {
      reservations: {
        orderBy: { startDate: 'desc' },
      },
      rateOverrides: {
        orderBy: { date: 'asc' },
      },
      blackoutRanges: {
        orderBy: { startDate: 'asc' },
      },
    },
  });

  return listings.map((listing) => ({
    ...serializeListing(listing),
    reservations: listing.reservations.map(buildReservationResponse),
    rateOverrides: listing.rateOverrides.map(serializeRateOverride),
    blackoutRanges: listing.blackoutRanges.map(serializeBlackout),
  }));
}
