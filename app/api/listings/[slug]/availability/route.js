import {
  getAvailabilityForRange,
  requireListingBySlug,
  serializeListing,
} from '@/lib/booking';
import { json, errorResponse } from '@/lib/api-utils';

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');

    if (!startDate || !endDate) {
      const error = new Error('DATE_RANGE_INVALID');
      error.code = 'DATE_RANGE_INVALID';
      throw error;
    }

    const listing = await requireListingBySlug(params.slug);

    const { availability } = await getAvailabilityForRange(listing, {
      startDate,
      endDate,
    });

    return json({
      listing: serializeListing(listing),
      availability,
      request: {
        startDate,
        endDate,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
