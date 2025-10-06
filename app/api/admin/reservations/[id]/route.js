import {
  buildReservationResponse,
  deleteReservation,
  formatPricing,
  updateReservation,
} from '@/lib/booking';
import { assertAdminRequest } from '@/lib/admin-auth';
import {
  errorResponse,
  json,
  requireJsonContentType,
} from '@/lib/api-utils';

export async function PATCH(request, { params }) {
  try {
    assertAdminRequest(request);
    requireJsonContentType(request);
    const payload = await request.json();

    const result = await updateReservation(params.id, payload);

    return json({
      reservation: buildReservationResponse(result.reservation),
      pricing: formatPricing(result.pricing),
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    assertAdminRequest(request);
    await deleteReservation(params.id);
    return json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
