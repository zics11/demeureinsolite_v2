'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/DatePicker';
import { format } from 'date-fns'; // Ajoute cette ligne en haut de ton fichier
import { fr } from 'date-fns/locale'; // Pour garantir que la date soit formatée en français

const Formulaire = () => {
  const [formData, setFormData] = useState({
    arrivalDate: '',
    departureDate: '',
    house: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    numberOfPeople: 1,
    numberOfChildren: 0, // Nouveau champ
    pets: false, // Case à cocher
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date, name) => {
    if (!date || !(date instanceof Date)) {
      console.error(`handleDateChange: valeur invalide pour ${name}`, date);
      return;
    }

    // Formater la date ici directement en format DD MMMM YYYY
    const formattedDate = format(date, 'dd MMMM yyyy', { locale: fr });

    setFormData({
      ...formData,
      [name]: formattedDate, // Mettre la date formatée directement dans formData
    });

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si tous les champs obligatoires sont remplis
    if (
      !formData.arrivalDate ||
      !formData.departureDate ||
      !formData.house ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      formData.numberOfPeople <= 0 || // Au moins 1 adulte
      formData.numberOfChildren < 0 // Pas de nombre négatif
    ) {
      setErrorMessage('❌ Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Réinitialiser le message d'erreur si tout est bon
    setErrorMessage('');

    console.log('📩 Envoi des données:', formData);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('✅ Email envoyé avec succès');
      } else {
        console.error('❌ Erreur lors de l’envoi');
      }
    } catch (error) {
      console.error('🌐 Erreur réseau:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <DatePicker
          name="arrivalDate"
          value={formData.arrivalDate}
          onChange={(date) => handleDateChange(date, 'arrivalDate')}
        />
        <DatePicker
          name="departureDate"
          value={formData.departureDate}
          onChange={(date) => handleDateChange(date, 'departureDate')}
        />
      </div>

      <Select
        name="house"
        value={formData.house}
        onValueChange={(value) =>
          handleChange({ target: { name: 'house', value } })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Maison" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="house1">Maison 1</SelectItem>
          <SelectItem value="house2">Maison 2</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex space-x-4">
        <Input
          name="firstName"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          aria-label="Prénom"
        />
        <Input
          name="lastName"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          aria-label="Nom"
        />
      </div>

      <Input
        name="address"
        placeholder="Adresse"
        value={formData.address}
        onChange={handleChange}
        aria-label="Adresse"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        aria-label="Email"
      />
      <Input
        name="phone"
        type="tel"
        placeholder="Téléphone"
        value={formData.phone}
        onChange={handleChange}
        aria-label="Téléphone"
      />

      <Input
        name="numberOfPeople"
        type="number"
        placeholder="Nombre de personnes"
        value={formData.numberOfPeople}
        onChange={handleChange}
        aria-label="Nombre de personnes"
      />

      <Input
        name="numberOfChildren"
        type="number"
        placeholder="Nombre d'enfants"
        value={formData.numberOfChildren}
        onChange={(e) =>
          setFormData({
            ...formData,
            numberOfChildren: parseInt(e.target.value) || 0,
          })
        }
        aria-label="Nombre d'enfants"
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="pets"
          name="pets"
          checked={formData.pets}
          onChange={(e) => setFormData({ ...formData, pets: e.target.checked })}
          className="h-5 w-5"
        />
        <label htmlFor="pets" className="text-sm">
          Voyage avec animaux
        </label>
      </div>

      <Textarea
        name="message"
        placeholder="Message (si besoin)"
        value={formData.message}
        onChange={handleChange}
        aria-label="Message"
      />

      {errorMessage && (
        <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
      )}

      <Button type="submit">Réserver</Button>
    </form>
  );
};

export default Formulaire;
