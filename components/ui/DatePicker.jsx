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

export function DatePicker({ name, value, onChange }) {
  const [date, setDate] = React.useState(value || null);

  // Fonction pour formater la date en français pour l'affichage
  const formattedDate = date
    ? format(date, 'dd MMMM yyyy', { locale: fr })
    : '';

  // Mettre à jour la date lorsque l'utilisateur sélectionne une nouvelle date
  const handleDateChange = (newDate) => {
    console.log('Selected Date:', newDate); // Afficher la date choisie

    setDate(newDate);
    onChange(newDate); // Passer la date brute à onChange pour l'envoyer à l'API
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            ' w-1/2 justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formattedDate : <span>Sélectionner une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange} // Utiliser handleDateChange pour capturer la date brute
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
