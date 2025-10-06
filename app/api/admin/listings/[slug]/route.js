import prisma from '@/lib/prisma';
import {
  requireListingBySlug,
  serializeListing,
} from '@/lib/booking';
import {
  assertAdminRequest,
} from '@/lib/admin-auth';
import {
  errorResponse,
  json,
  requireJsonContentType,
} from '@/lib/api-utils';

const MUTABLE_FIELDS = new Set([
  'title',
  'subtitle',
  'description',
  'baseRateCents',
  'cleaningFeeCents',
  'maxGuests',
]);

export async function PATCH(request, { params }) {
  try {
    assertAdminRequest(request);
    requireJsonContentType(request);

    const payload = await request.json();
    const listing = await requireListingBySlug(params.slug);

    const data = Object.entries(payload ?? {})
      .filter(([key]) => MUTABLE_FIELDS.has(key))
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }), {});

    if (Object.keys(data).length === 0) {
      return json({ listing: serializeListing(listing) });
    }

    if (data.baseRateCents != null) {
      data.baseRateCents = Number.parseInt(data.baseRateCents, 10);
      if (Number.isNaN(data.baseRateCents)) {
        const error = new Error('INVALID_NUMBER');
        error.code = 'INVALID_NUMBER';
        throw error;
      }
    }
    if (data.cleaningFeeCents != null) {
      data.cleaningFeeCents = Number.parseInt(data.cleaningFeeCents, 10);
      if (Number.isNaN(data.cleaningFeeCents)) {
        const error = new Error('INVALID_NUMBER');
        error.code = 'INVALID_NUMBER';
        throw error;
      }
    }
    if (data.maxGuests != null) {
      data.maxGuests = Number.parseInt(data.maxGuests, 10);
      if (Number.isNaN(data.maxGuests)) {
        const error = new Error('INVALID_NUMBER');
        error.code = 'INVALID_NUMBER';
        throw error;
      }
    }

    const updated = await prisma.listing.update({
      where: { id: listing.id },
      data,
    });

    return json({ listing: serializeListing(updated) });
  } catch (error) {
    return errorResponse(error);
  }
}
