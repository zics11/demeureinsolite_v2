'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';

import {
  createBlackoutAction,
  createRateOverrideAction,
  createReservationAction,
  deleteBlackoutAction,
  deleteRateOverrideAction,
  deleteReservationAction,
  refreshListingsAction,
  updateListingAction,
  updateReservationAction,
} from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'En attente' },
  { value: 'CONFIRMED', label: 'Confirmée' },
  { value: 'CANCELLED', label: 'Annulée' },
];

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

function formatPrice(cents) {
  return currencyFormatter.format((cents ?? 0) / 100);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR');
}

function AdminSection({ title, children }) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export default function AdminDashboard({ initialListings }) {
  const [listings, setListings] = useState(initialListings);
  const [selectedSlug, setSelectedSlug] = useState(initialListings[0]?.slug ?? null);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  const selectedListing = useMemo(
    () => listings.find((listing) => listing.slug === selectedSlug) ?? null,
    [listings, selectedSlug],
  );

  const [listingForm, setListingForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    baseRateCents: '',
    cleaningFeeCents: '',
    maxGuests: '',
  });

  const [rateForm, setRateForm] = useState({
    startDate: '',
    endDate: '',
    priceCents: '',
  });

  const [blackoutForm, setBlackoutForm] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  const [reservationForm, setReservationForm] = useState({
    startDate: '',
    endDate: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    adults: 1,
    children: 0,
    notes: '',
    status: 'CONFIRMED',
  });

  useEffect(() => {
    if (selectedListing) {
      setListingForm({
        title: selectedListing.title ?? '',
        subtitle: selectedListing.subtitle ?? '',
        description: selectedListing.description ?? '',
        baseRateCents: selectedListing.baseRateCents ?? '',
        cleaningFeeCents: selectedListing.cleaningFeeCents ?? '',
        maxGuests: selectedListing.maxGuests ?? '',
      });
      setRateForm({ startDate: '', endDate: '', priceCents: selectedListing.baseRateCents ?? '' });
      setBlackoutForm({ startDate: '', endDate: '', reason: '' });
      setReservationForm((current) => ({
        ...current,
        startDate: '',
        endDate: '',
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        adults: 1,
        children: 0,
        notes: '',
        status: 'CONFIRMED',
      }));
    }
  }, [selectedListing]);

  const handleError = (err) => {
    console.error(err);
    const message = err?.message ?? 'Une erreur est survenue.';
    setError(message);
    setFeedback(null);
  };

  const handleSuccess = (message) => {
    setFeedback(message);
    setError(null);
  };

  const refreshData = () => {
    startTransition(async () => {
      try {
        const data = await refreshListingsAction();
        setListings(data);
        handleSuccess('Données mises à jour');
      } catch (err) {
        handleError(err);
      }
    });
  };

  const updateListingState = (slug, updater) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.slug === slug ? { ...listing, ...updater(listing) } : listing,
      ),
    );
  };

  const handleListingSubmit = (event) => {
    event.preventDefault();
    if (!selectedListing) return;
    startTransition(async () => {
      try {
        const updated = await updateListingAction({
          slug: selectedListing.slug,
          data: listingForm,
        });
        updateListingState(selectedListing.slug, () => updated);
        handleSuccess('Annonce mise à jour');
      } catch (err) {
        handleError(err);
      }
    });
  };

  const handleRateSubmit = (event) => {
    event.preventDefault();
    if (!selectedListing) return;
    startTransition(async () => {
      try {
        const overrides = await createRateOverrideAction({
          slug: selectedListing.slug,
          ...rateForm,
        });
        updateListingState(selectedListing.slug, (listing) => {
          const filtered = listing.rateOverrides.filter(
            (override) => !overrides.find((item) => item.id === override.id),
          );
          const next = [...filtered, ...overrides];
          next.sort((a, b) => new Date(a.date) - new Date(b.date));
          return { rateOverrides: next };
        });
        setRateForm({ startDate: '', endDate: '', priceCents: overrides[0]?.priceCents ?? selectedListing.baseRateCents ?? 0 });
        handleSuccess('Tarifs journaliers mis à jour');
      } catch (err) {
        handleError(err);
      }
    });
  };

  const handleDeleteOverride = (date) => {
    if (!selectedListing) return;
    startTransition(async () => {
      try {
        await deleteRateOverrideAction({ slug: selectedListing.slug, date });
        updateListingState(selectedListing.slug, (listing) => ({
          rateOverrides: listing.rateOverrides.filter((override) => override.date !== date),
        }));
        handleSuccess('Tarif spécifique supprimé');
      } catch (err) {
        handleError(err);
      }
    });
  };

  const handleBlackoutSubmit = (event) => {
    event.preventDefault();
    if (!selectedListing) return;
    startTransition(async () => {
      try {
        const blackout = await createBlackoutAction({
          slug: selectedListing.slug,
          ...blackoutForm,
        });
        updateListingState(selectedListing.slug, (listing) => {
          const next = [...listing.blackoutRanges, blackout];
          next.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
          return { blackoutRanges: next };
        });
        setBlackoutForm({ startDate: '', endDate: '', reason: '' });
        handleSuccess('Plage bloquée ajoutée');
      } catch (err) {
        handleError(err);
      }
    });
  };

  const handleDeleteBlackout = (id) => {
    startTransition(async () => {
      try {
        await deleteBlackoutAction({ id });
        if (selectedListing) {
          updateListingState(selectedListing.slug, (listing) => ({
            blackoutRanges: listing.blackoutRanges.filter((range) => range.id !== id),
          }));
        }
        handleSuccess('Plage bloquée supprimée');
      } catch (err) {
        handleError(err);
      }
    });
  };

  const handleReservationSubmit = (event) => {
    event.preventDefault();
    if (!selectedListing) return;
    startTransition(async () => {
      try {
        const result = await createReservationAction({
          slug: selectedListing.slug,
          payload: {
            ...reservationForm,
            adults: Number.parseInt(reservationForm.adults, 10) || 1,
            children: Number.parseInt(reservationForm.children, 10) || 0,
          },
        });
        updateListingState(selectedListing.slug, (listing) => ({
          reservations: [result.reservation, ...listing.reservations],
        }));
        setReservationForm({
          startDate: '',
          endDate: '',
          guestName: '',
          guestEmail: '',
          guestPhone: '',
          adults: 1,
          children: 0,
          notes: '',
          status: 'CONFIRMED',
        });
        handleSuccess('Réservation créée');
      } catch (err) {
        handleError(err);
      }
    });
  };

  const handleReservationStatus = (id, status) => {
    startTransition(async () => {
      try {
        const result = await updateReservationAction({ id, data: { status } });
        if (selectedListing) {
          updateListingState(selectedListing.slug, (listing) => ({
            reservations: listing.reservations.map((reservation) =>
              reservation.id === id ? result.reservation : reservation,
            ),
          }));
        }
        handleSuccess('Réservation mise à jour');
      } catch (err) {
        handleError(err);
      }
    });
  };

  const handleDeleteReservation = (id) => {
    startTransition(async () => {
      try {
        await deleteReservationAction({ id });
        if (selectedListing) {
          updateListingState(selectedListing.slug, (listing) => ({
            reservations: listing.reservations.filter((reservation) => reservation.id !== id),
          }));
        }
        handleSuccess('Réservation supprimée');
      } catch (err) {
        handleError(err);
      }
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 py-10">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4">
        <aside className="w-64 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-stone-800">Back-office</h1>
            <Button size="sm" variant="ghost" onClick={refreshData} disabled={isPending}>
              Rafraîchir
            </Button>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white">
            <ul className="divide-y divide-stone-200">
              {listings.map((listing) => (
                <li key={listing.slug}>
                  <button
                    type="button"
                    onClick={() => setSelectedSlug(listing.slug)}
                    className={cn(
                      'flex w-full flex-col items-start gap-1 p-3 text-left',
                      selectedSlug === listing.slug
                        ? 'bg-stone-100 font-medium'
                        : 'hover:bg-stone-50',
                    )}
                  >
                    <span>{listing.title}</span>
                    <span className="text-xs text-stone-500">Tarif base {formatPrice(listing.baseRateCents)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {(feedback || error) && (
            <div
              className={cn(
                'rounded-md border px-3 py-2 text-sm',
                feedback
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-red-500 bg-red-50 text-red-700',
              )}
            >
              {feedback || error}
            </div>
          )}
        </aside>
        <main className="flex-1 space-y-6">
          {selectedListing ? (
            <>
              <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-stone-900">{selectedListing.title}</h2>
                <p className="text-sm text-stone-500">
                  {selectedListing.subtitle || 'Sans sous-titre'} • {selectedListing.maxGuests} voyageurs • Nettoyage {formatPrice(selectedListing.cleaningFeeCents)}
                </p>
              </div>

              <AdminSection title="Détails de l'annonce">
                <form className="space-y-4" onSubmit={handleListingSubmit}>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="flex flex-col gap-1 text-sm">
                      <span>Titre</span>
                      <Input
                        value={listingForm.title}
                        onChange={(event) =>
                          setListingForm((current) => ({
                            ...current,
                            title: event.target.value,
                          }))
                        }
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                      <span>Sous-titre</span>
                      <Input
                        value={listingForm.subtitle}
                        onChange={(event) =>
                          setListingForm((current) => ({
                            ...current,
                            subtitle: event.target.value,
                          }))
                        }
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Description</span>
                    <Textarea
                      rows={4}
                      value={listingForm.description}
                      onChange={(event) =>
                        setListingForm((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <div className="grid gap-3 md:grid-cols-3">
                    <label className="flex flex-col gap-1 text-sm">
                      <span>Tarif de base (€)</span>
                      <Input
                        type="number"
                        value={
                          listingForm.baseRateCents === ''
                            ? ''
                            : listingForm.baseRateCents / 100
                        }
                        onChange={(event) =>
                          setListingForm((current) => ({
                            ...current,
                            baseRateCents: Math.round(Number(event.target.value || 0) * 100),
                          }))
                        }
                        min={0}
                        step="0.01"
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                      <span>Frais de ménage (€)</span>
                      <Input
                        type="number"
                        value={
                          listingForm.cleaningFeeCents === ''
                            ? ''
                            : listingForm.cleaningFeeCents / 100
                        }
                        onChange={(event) =>
                          setListingForm((current) => ({
                            ...current,
                            cleaningFeeCents: Math.round(Number(event.target.value || 0) * 100),
                          }))
                        }
                        min={0}
                        step="0.01"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-sm">
                      <span>Voyageurs max</span>
                      <Input
                        type="number"
                        value={listingForm.maxGuests}
                        onChange={(event) =>
                          setListingForm((current) => ({
                            ...current,
                            maxGuests: Number(event.target.value || 1),
                          }))
                        }
                        min={1}
                      />
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isPending}>
                      Enregistrer
                    </Button>
                  </div>
                </form>
              </AdminSection>

              <AdminSection title="Tarifs spécifiques">
                <form className="grid gap-3 md:grid-cols-4" onSubmit={handleRateSubmit}>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Date début</span>
                    <Input
                      type="date"
                      value={rateForm.startDate}
                      onChange={(event) =>
                        setRateForm((current) => ({
                          ...current,
                          startDate: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Date fin</span>
                    <Input
                      type="date"
                      value={rateForm.endDate}
                      onChange={(event) =>
                        setRateForm((current) => ({
                          ...current,
                          endDate: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Tarif (€)</span>
                      <Input
                        type="number"
                        value={
                          rateForm.priceCents === ''
                            ? ''
                            : rateForm.priceCents / 100
                        }
                        onChange={(event) =>
                          setRateForm((current) => ({
                            ...current,
                            priceCents: Math.round(Number(event.target.value || 0) * 100),
                          }))
                        }
                      min={0}
                      step="0.01"
                      required
                    />
                  </label>
                  <div className="flex items-end justify-end">
                    <Button type="submit" disabled={isPending}>
                      Ajouter / mettre à jour
                    </Button>
                  </div>
                </form>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase text-stone-500">
                        <th className="py-2">Date</th>
                        <th className="py-2">Tarif</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedListing.rateOverrides.length > 0 ? (
                        selectedListing.rateOverrides
                          .slice()
                          .sort((a, b) => new Date(a.date) - new Date(b.date))
                          .map((override) => (
                            <tr key={override.id} className="border-t text-stone-700">
                              <td className="py-2">{formatDate(override.date)}</td>
                              <td className="py-2">{formatPrice(override.priceCents)}</td>
                              <td className="py-2 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteOverride(override.date)}
                                  disabled={isPending}
                                >
                                  Supprimer
                                </Button>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td className="py-3 text-stone-500" colSpan={3}>
                            Aucun tarif spécifique enregistré.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </AdminSection>

              <AdminSection title="Plages bloquées">
                <form className="grid gap-3 md:grid-cols-4" onSubmit={handleBlackoutSubmit}>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Date début</span>
                    <Input
                      type="date"
                      value={blackoutForm.startDate}
                      onChange={(event) =>
                        setBlackoutForm((current) => ({
                          ...current,
                          startDate: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Date fin</span>
                    <Input
                      type="date"
                      value={blackoutForm.endDate}
                      onChange={(event) =>
                        setBlackoutForm((current) => ({
                          ...current,
                          endDate: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm md:col-span-2">
                    <span>Motif</span>
                    <Input
                      value={blackoutForm.reason}
                      onChange={(event) =>
                        setBlackoutForm((current) => ({
                          ...current,
                          reason: event.target.value,
                        }))
                      }
                      placeholder="Travaux, indisponible..."
                    />
                  </label>
                  <div className="md:col-span-4 flex justify-end">
                    <Button type="submit" disabled={isPending}>
                      Bloquer
                    </Button>
                  </div>
                </form>
                <ul className="space-y-3 text-sm">
                  {selectedListing.blackoutRanges.length > 0 ? (
                    selectedListing.blackoutRanges.map((range) => (
                      <li
                        key={range.id}
                        className="flex items-center justify-between rounded border border-stone-200 p-3"
                      >
                        <div>
                          <div className="font-medium text-stone-800">
                            {formatDate(range.startDate)} ➝ {formatDate(range.endDate)}
                          </div>
                          {range.reason && (
                            <div className="text-xs text-stone-500">{range.reason}</div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBlackout(range.id)}
                          disabled={isPending}
                        >
                          Supprimer
                        </Button>
                      </li>
                    ))
                  ) : (
                    <li className="text-stone-500">Aucune date bloquée.</li>
                  )}
                </ul>
              </AdminSection>

              <AdminSection title="Réservations">
                <form className="grid gap-3 md:grid-cols-4" onSubmit={handleReservationSubmit}>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Début</span>
                    <Input
                      type="date"
                      value={reservationForm.startDate}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          startDate: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Fin</span>
                    <Input
                      type="date"
                      value={reservationForm.endDate}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          endDate: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Nom</span>
                    <Input
                      value={reservationForm.guestName}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          guestName: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Email</span>
                    <Input
                      type="email"
                      value={reservationForm.guestEmail}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          guestEmail: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Téléphone</span>
                    <Input
                      value={reservationForm.guestPhone}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          guestPhone: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Adultes</span>
                    <Input
                      type="number"
                      value={reservationForm.adults}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          adults: event.target.value,
                        }))
                      }
                      min={1}
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Enfants</span>
                    <Input
                      type="number"
                      value={reservationForm.children}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          children: event.target.value,
                        }))
                      }
                      min={0}
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Statut</span>
                    <select
                      className="h-10 rounded border border-stone-200 px-3 text-sm"
                      value={reservationForm.status}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          status: event.target.value,
                        }))
                      }
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="md:col-span-4 flex flex-col gap-1 text-sm">
                    <span>Notes</span>
                    <Textarea
                      rows={3}
                      value={reservationForm.notes}
                      onChange={(event) =>
                        setReservationForm((current) => ({
                          ...current,
                          notes: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <div className="md:col-span-4 flex justify-end">
                    <Button type="submit" disabled={isPending}>
                      Créer la réservation
                    </Button>
                  </div>
                </form>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase text-stone-500">
                        <th className="py-2">Période</th>
                        <th className="py-2">Client</th>
                        <th className="py-2">Montant</th>
                        <th className="py-2">Statut</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedListing.reservations.length > 0 ? (
                        selectedListing.reservations.map((reservation) => (
                          <tr key={reservation.id} className="border-t">
                            <td className="py-2 text-stone-700">
                              {formatDate(reservation.startDate)} ➝ {formatDate(reservation.endDate)}
                            </td>
                            <td className="py-2 text-stone-700">
                              <div className="font-medium">{reservation.guestName}</div>
                              <div className="text-xs text-stone-500">{reservation.guestEmail}</div>
                            </td>
                            <td className="py-2 text-stone-700">{formatPrice(reservation.totalAmountCents)}</td>
                            <td className="py-2 text-xs font-medium uppercase text-stone-500">{reservation.status}</td>
                            <td className="py-2 text-right">
                              <div className="flex justify-end gap-2">
                                {STATUS_OPTIONS.filter((option) => option.value !== reservation.status).map((option) => (
                                  <Button
                                    key={option.value}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleReservationStatus(reservation.id, option.value)}
                                    disabled={isPending}
                                  >
                                    {option.label}
                                  </Button>
                                ))}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteReservation(reservation.id)}
                                  disabled={isPending}
                                >
                                  Supprimer
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-3 text-stone-500">
                            Aucune réservation enregistrée.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </AdminSection>
            </>
          ) : (
            <div className="rounded-lg border border-stone-200 bg-white p-6 text-center text-stone-500">
              Sélectionnez une annonce pour commencer la gestion.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
