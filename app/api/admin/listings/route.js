import { fetchListingsWithAdminData } from '@/lib/booking';
import { assertAdminRequest } from '@/lib/admin-auth';
import { json, errorResponse } from '@/lib/api-utils';

export async function GET(request) {
  try {
    assertAdminRequest(request);
    const listings = await fetchListingsWithAdminData();
    return json({ listings });
  } catch (error) {
    return errorResponse(error);
  }
}
