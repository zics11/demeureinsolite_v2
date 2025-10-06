import Image from 'next/image';
import Link from 'next/link';
import { addDays } from 'date-fns';

import BookingWidget from '@/components/booking/booking-widget';
import {
  getAvailabilityForRange,
  requireListingBySlug,
  serializeListing,
} from '@/lib/booking';

function getGalleryForListing(slug) {
  if (slug === 'villa-cosita') {
    return [
      '/maisons/1/1.jpeg',
      '/maisons/1/2.jpeg',
      '/maisons/1/3.jpeg',
    ];
  }

  if (slug === 'la-foret') {
    return [
      '/maisons/2/1 - Moyenne.jpeg',
      '/maisons/2/2 - Moyenne.jpeg',
      '/maisons/2/3 - Moyenne.jpeg',
    ];
  }

  return [];
}

export const dynamic = 'force-dynamic';

export default async function ListingPage({ params }) {
  const listing = await requireListingBySlug(params.slug);
  const rangeStart = new Date();
  rangeStart.setUTCHours(0, 0, 0, 0);
  const rangeEnd = addDays(rangeStart, 180);

  const availability = await getAvailabilityForRange(listing, {
    startDate: rangeStart,
    endDate: rangeEnd,
  });

  const gallery = getGalleryForListing(listing.slug);

  return (
    <div className="bg-stone-50">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-800">
          ← Retour à l’accueil
        </Link>
        <header className="space-y-4">
          <h1 className="text-3xl font-semibold text-stone-900">{listing.title}</h1>
          {listing.subtitle && (
            <p className="text-lg text-stone-600">{listing.subtitle}</p>
          )}
          <div className="text-sm text-stone-500">
            {listing.maxGuests} voyageurs • {listing.description || 'Séjour insolite en Occitanie'}
          </div>
        </header>

        {gallery.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {gallery.map((src) => (
              <div key={src} className="overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={listing.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <BookingWidget
          listing={serializeListing(listing)}
          initialAvailability={availability.availability}
        />
      </div>
    </div>
  );
}
