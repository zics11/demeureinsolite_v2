import prisma from '@/lib/prisma';
import {
  buildReservationResponse,
  createReservation,
  formatPricing,
  requireListingById,
  requireListingBySlug,
  serializeListing,
} from '@/lib/booking';
import { assertAdminRequest } from '@/lib/admin-auth';
import {
  errorResponse,
  json,
  requireJsonContentType,
} from '@/lib/api-utils';

export async function GET(request) {
  try {
    assertAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const listingSlug = searchParams.get('listingSlug');
    const listingIdParam = searchParams.get('listingId');

    const where = {};
    let listing;

    if (listingSlug) {
      listing = await requireListingBySlug(listingSlug);
      where.listingId = listing.id;
    } else if (listingIdParam) {
      where.listingId = listingIdParam;
      listing = await requireListingById(listingIdParam);
    }

    const reservations = await prisma.reservation.findMany({
      where,
      orderBy: { startDate: 'asc' },
    });

    return json({
      reservations: reservations.map(buildReservationResponse),
      listing: listing ? serializeListing(listing) : undefined,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request) {
  try {
    assertAdminRequest(request);
    requireJsonContentType(request);

    const payload = await request.json();

    const listingId = payload.listingId;
    const listingSlug = payload.listingSlug;

    let listing;
    if (listingId) {
      listing = await requireListingById(listingId);
    } else if (listingSlug) {
      listing = await requireListingBySlug(listingSlug);
    } else {
      const error = new Error('LISTING_REQUIRED');
      error.code = 'LISTING_REQUIRED';
      throw error;
    }

    const result = await createReservation({ listing, payload });

    return json({
      reservation: buildReservationResponse(result.reservation),
      pricing: formatPricing(result.pricing),
    }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
