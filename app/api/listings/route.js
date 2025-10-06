import { listListings, serializeListing } from '@/lib/booking';
import { json, errorResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const listings = await listListings();
    return json({ listings: listings.map(serializeListing) });
  } catch (error) {
    return errorResponse(error);
  }
}
