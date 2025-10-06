import prisma from '@/lib/prisma';
import {
  createRateOverrides,
  deleteRateOverride,
  requireListingBySlug,
  serializeListing,
  serializeRateOverride,
} from '@/lib/booking';
import { assertAdminRequest } from '@/lib/admin-auth';
import {
  errorResponse,
  json,
  requireJsonContentType,
} from '@/lib/api-utils';

export async function GET(request, { params }) {
  try {
    assertAdminRequest(request);
    const listing = await requireListingBySlug(params.slug);

    const overrides = await prisma.rateOverride.findMany({
      where: { listingId: listing.id },
      orderBy: { date: 'asc' },
    });

    return json({
      listing: serializeListing(listing),
      overrides: overrides.map(serializeRateOverride),
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request, { params }) {
  try {
    assertAdminRequest(request);
    requireJsonContentType(request);
    const payload = await request.json();
    const listing = await requireListingBySlug(params.slug);

    const priceCents = Number.parseInt(payload.priceCents, 10);
    if (Number.isNaN(priceCents)) {
      const error = new Error('INVALID_NUMBER');
      error.code = 'INVALID_NUMBER';
      throw error;
    }

    const overrides = await createRateOverrides(
      listing.id,
      payload.startDate,
      payload.endDate,
      priceCents,
    );

    return json({
      listing: serializeListing(listing),
      overrides: overrides.map(serializeRateOverride),
    }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    assertAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    if (!date) {
      const error = new Error('MISSING_FIELDS');
      error.code = 'MISSING_FIELDS';
      error.missingFields = ['date'];
      throw error;
    }

    const listing = await requireListingBySlug(params.slug);
    await deleteRateOverride(listing.id, date);
    return json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
