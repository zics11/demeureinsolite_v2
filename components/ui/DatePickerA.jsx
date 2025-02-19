import * as React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'; // Importation de la locale française
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePickerA({ name, value, onChange }) {
  const [date, setDate] = React.useState(value || null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // Si la valeur du parent change, mettre à jour l'état local du DatePicker
    if (value === null || value === '') {
      setDate(null); // Réinitialiser la date à null
    } else if (value && value !== date) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate)) {
        setDate(parsedDate); // Mettre à jour la date si elle est valide
      }
    }
  }, [value]);

  const handleDateChange = (newDate) => {
    if (!newDate || isNaN(newDate)) return;
    setDate(newDate); // Mettre à jour l'état local de la date
    onChange(newDate); // Passer la nouvelle date au parent
    setOpen(false); // Fermer le popover après sélection
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-1/2 justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'dd MMMM yyyy', { locale: fr })
          ) : (
            <span className="text-stone-500">Date d'arrivée *</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
