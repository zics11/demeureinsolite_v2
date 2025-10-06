'use server';

import prisma from '@/lib/prisma';
import {
  buildReservationResponse,
  createBlackout,
  createRateOverrides,
  createReservation,
  deleteBlackout,
  deleteRateOverride,
  deleteReservation,
  fetchListingsWithAdminData,
  formatPricing,
  requireListingBySlug,
  serializeBlackout,
  serializeListing,
  serializeRateOverride,
  updateReservation,
} from '@/lib/booking';

export async function refreshListingsAction() {
  return fetchListingsWithAdminData();
}

export async function updateListingAction({ slug, data }) {
  const listing = await requireListingBySlug(slug);
  const updateData = {};

  if (data.title !== undefined) updateData.title = data.title;
  if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.baseRateCents !== undefined)
    updateData.baseRateCents = Number.parseInt(data.baseRateCents, 10);
  if (data.cleaningFeeCents !== undefined)
    updateData.cleaningFeeCents = Number.parseInt(data.cleaningFeeCents, 10);
  if (data.maxGuests !== undefined)
    updateData.maxGuests = Number.parseInt(data.maxGuests, 10);

  const updated = await prisma.listing.update({
    where: { id: listing.id },
    data: updateData,
  });

  return serializeListing(updated);
}

export async function createRateOverrideAction({
  slug,
  startDate,
  endDate,
  priceCents,
}) {
  const listing = await requireListingBySlug(slug);
  const overrides = await createRateOverrides(
    listing.id,
    startDate,
    endDate,
    Number.parseInt(priceCents, 10),
  );
  return overrides.map(serializeRateOverride);
}

export async function deleteRateOverrideAction({ slug, date }) {
  const listing = await requireListingBySlug(slug);
  await deleteRateOverride(listing.id, date);
  return true;
}

export async function createBlackoutAction({ slug, startDate, endDate, reason }) {
  const listing = await requireListingBySlug(slug);
  const blackout = await createBlackout(listing.id, startDate, endDate, reason);
  return serializeBlackout(blackout);
}

export async function deleteBlackoutAction({ id }) {
  await deleteBlackout(id);
  return true;
}

export async function createReservationAction({ slug, payload }) {
  const listing = await requireListingBySlug(slug);
  const result = await createReservation({ listing, payload });
  return {
    reservation: buildReservationResponse(result.reservation),
    pricing: formatPricing(result.pricing),
  };
}

export async function updateReservationAction({ id, data }) {
  const result = await updateReservation(id, data);
  return {
    reservation: buildReservationResponse(result.reservation),
    pricing: formatPricing(result.pricing),
  };
}

export async function deleteReservationAction({ id }) {
  await deleteReservation(id);
  return true;
}
