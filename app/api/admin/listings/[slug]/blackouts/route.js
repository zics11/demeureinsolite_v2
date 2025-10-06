import prisma from '@/lib/prisma';
import {
  createBlackout,
  deleteBlackout,
  requireListingBySlug,
  serializeBlackout,
  serializeListing,
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
    const blackouts = await prisma.blackoutRange.findMany({
      where: { listingId: listing.id },
      orderBy: { startDate: 'asc' },
    });

    return json({
      listing: serializeListing(listing),
      blackouts: blackouts.map(serializeBlackout),
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

    const blackout = await createBlackout(
      listing.id,
      payload.startDate,
      payload.endDate,
      payload.reason,
    );

    return json({
      blackout: serializeBlackout(blackout),
    }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    assertAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      const error = new Error('MISSING_FIELDS');
      error.code = 'MISSING_FIELDS';
      error.missingFields = ['id'];
      throw error;
    }

    await deleteBlackout(id);
    return json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
