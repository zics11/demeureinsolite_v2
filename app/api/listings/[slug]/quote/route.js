import prisma from '@/lib/prisma';
import {
  calculatePricing,
  formatPricing,
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
    const availabilityResult = await getAvailabilityForRange(listing, {
      startDate,
      endDate,
    });

    const isRangeAvailable = availabilityResult.availability.every(
      (day) => day.available,
    );

    if (!isRangeAvailable) {
      const error = new Error('DATES_BLOCKED');
      error.code = 'DATES_BLOCKED';
      throw error;
    }

    const pricing = await calculatePricing(prisma, listing, startDate, endDate);

    return json({
      listing: serializeListing(listing),
      pricing: formatPricing(pricing),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
