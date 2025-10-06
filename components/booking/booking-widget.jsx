'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

function toDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return date;
}

function formatPrice(cents) {
  return currencyFormatter.format((cents ?? 0) / 100);
}

function buildDisabledDays(availability) {
  return availability
    .filter((day) => !day.available)
    .map((day) => new Date(`${day.date}T00:00:00Z`));
}

function formatRange(range) {
  if (!range?.from || !range?.to) return null;
  return {
    start: range.from.toISOString().slice(0, 10),
    end: range.to.toISOString().slice(0, 10),
  };
}

export default function BookingWidget({ listing, initialAvailability }) {
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
  const [availability, setAvailability] = useState(initialAvailability);
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', message: null });
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    adults: 2,
    children: 0,
    notes: '',
  });

  useEffect(() => {
    setAvailability(initialAvailability);
  }, [initialAvailability]);

  const disabledDays = useMemo(
    () => [{ before: new Date() }, ...buildDisabledDays(availability)],
    [availability],
  );

  const isRangeAvailable = useMemo(() => {
    if (!selectedRange.from || !selectedRange.to) return false;
    const start = selectedRange.from.toISOString().slice(0, 10);
    const end = selectedRange.to.toISOString().slice(0, 10);
    const dates = availability.filter(
      (day) => day.date >= start && day.date < end,
    );
    return dates.length > 0 && dates.every((day) => day.available);
  }, [availability, selectedRange]);

  const handleSelect = (range) => {
    setSelectedRange(range || { from: null, to: null });
    setQuote(null);
    setStatus({ type: 'idle', message: null });
  };

  const fetchQuote = async (range) => {
    if (!range?.from || !range?.to) return;
    try {
      const params = new URLSearchParams({
        start: range.from.toISOString().slice(0, 10),
        end: range.to.toISOString().slice(0, 10),
      });
      const response = await fetch(`/api/listings/${listing.slug}/quote?${params}`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || 'DATES_BLOCKED');
      }
      const payload = await response.json();
      setQuote(payload.pricing);
      setStatus({ type: 'success', message: 'Dates disponibles' });
    } catch (error) {
      setQuote(null);
      setStatus({ type: 'error', message: "Ces dates ne sont pas disponibles" });
    }
  };

  useEffect(() => {
    if (selectedRange.from && selectedRange.to) {
      fetchQuote(selectedRange);
    }
  }, [selectedRange?.from, selectedRange?.to]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedRange.from || !selectedRange.to) {
      setStatus({ type: 'error', message: 'Choisissez des dates avant de réserver.' });
      return;
    }
    if (!isRangeAvailable) {
      setStatus({ type: 'error', message: 'La plage sélectionnée n’est plus disponible.' });
      return;
    }

    startTransition(async () => {
      try {
        const range = formatRange(selectedRange);
        const response = await fetch(`/api/listings/${listing.slug}/reservations`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            startDate: range.start,
            endDate: range.end,
          }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload?.error || 'UNKNOWN_ERROR');
        }

        setStatus({ type: 'success', message: 'Votre demande de réservation a bien été enregistrée.' });
        setFormData({
          guestName: '',
          guestEmail: '',
          guestPhone: '',
          adults: 2,
          children: 0,
          notes: '',
        });
        setSelectedRange({ from: null, to: null });
        setQuote(null);
      } catch (error) {
        setStatus({
          type: 'error',
          message:
            error.message === 'DATES_ALREADY_RESERVED' || error.message === 'DATES_BLOCKED'
              ? 'Ces dates ne sont plus disponibles. Merci de choisir une autre période.'
              : 'Impossible de créer la réservation. Merci de réessayer.',
        });
      }
    });
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-stone-900">Réserver votre séjour</h2>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={selectedRange}
          onSelect={handleSelect}
          disabled={disabledDays}
        />
        <div className="space-y-4">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
            <div className="flex items-center justify-between">
              <span>Nuitée de base</span>
              <span>{formatPrice(listing.baseRateCents)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Frais de ménage</span>
              <span>{formatPrice(listing.cleaningFeeCents)}</span>
            </div>
            {quote && (
              <>
                <div className="flex items-center justify-between font-medium text-stone-900">
                  <span>Total {quote.nights} nuits</span>
                  <span>{formatPrice(quote.totalAmountCents)}</span>
                </div>
                <p className="text-xs text-stone-500">Prix calculé selon les tarifs journaliers en vigueur.</p>
              </>
            )}
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span>Nom et prénom</span>
                <Input
                  required
                  value={formData.guestName}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      guestName: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>Email</span>
                <Input
                  type="email"
                  required
                  value={formData.guestEmail}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      guestEmail: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm">
              <span>Téléphone</span>
              <Input
                value={formData.guestPhone}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    guestPhone: event.target.value,
                  }))
                }
              />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span>Adultes</span>
                <Input
                  type="number"
                  min={1}
                  value={formData.adults}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      adults: Number(event.target.value || 1),
                    }))
                  }
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>Enfants</span>
                <Input
                  type="number"
                  min={0}
                  value={formData.children}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      children: Number(event.target.value || 0),
                    }))
                  }
                />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-sm">
              <span>Message</span>
              <Textarea
                rows={4}
                value={formData.notes}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                placeholder="Précisez vos besoins, horaires d’arrivée, etc."
              />
            </label>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || !selectedRange.from || !selectedRange.to || !isRangeAvailable}
            >
              {isPending ? 'Envoi en cours...' : 'Demander une réservation'}
            </Button>
          </form>

          {status.message && (
            <div
              className={cn(
                'rounded-md px-3 py-2 text-sm',
                status.type === 'error'
                  ? 'border border-red-500 bg-red-50 text-red-700'
                  : 'border border-emerald-500 bg-emerald-50 text-emerald-700',
              )}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
