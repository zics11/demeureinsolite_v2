import {
  buildReservationResponse,
  createReservation,
  formatPricing,
  requireListingBySlug,
} from '@/lib/booking';
import {
  errorResponse,
  json,
  requireJsonContentType,
} from '@/lib/api-utils';

const REQUIRED_FIELDS = ['startDate', 'endDate', 'guestName', 'guestEmail'];

export async function POST(request, { params }) {
  try {
    requireJsonContentType(request);
    const payload = await request.json();

    const missing = REQUIRED_FIELDS.filter((field) => !payload?.[field]);
    if (missing.length > 0) {
      const error = new Error('MISSING_FIELDS');
      error.code = 'MISSING_FIELDS';
      error.missingFields = missing;
      throw error;
    }

    const listing = await requireListingBySlug(params.slug);

    const result = await createReservation({
      listing,
      payload,
    });

    return json(
      {
        reservation: buildReservationResponse(result.reservation),
        pricing: formatPricing(result.pricing),
      },
      { status: 201 },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
