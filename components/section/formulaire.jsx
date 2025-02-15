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
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre le formulaire, par exemple, envoyer les données à un serveur
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <DatePicker
          label="Date d'arrivée"
          value={formData.arrivalDate}
          onChange={(date) => handleDateChange(date, 'arrivalDate')}
        />
        <DatePicker
          label="Date de départ"
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
          {/* Ajoutez d'autres maisons ici */}
        </SelectContent>
      </Select>

      <div className="flex space-x-4">
        <Input
          label="Prénom"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          aria-label="Prénom"
        />
        <Input
          label="Nom"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          aria-label="Nom"
        />
      </div>
      <Input
        label="Adresse"
        name="address"
        value={formData.address}
        onChange={handleChange}
        aria-label="Adresse"
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        aria-label="Email"
      />
      <Input
        label="Téléphone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        aria-label="Téléphone"
      />
      <Input
        label="Nombre de personnes"
        type="number"
        name="numberOfPeople"
        value={formData.numberOfPeople}
        onChange={handleChange}
        aria-label="Nombre de personnes"
      />
      <Textarea
        label="Message (si besoin)"
        name="message"
        value={formData.message}
        onChange={handleChange}
        aria-label="Message"
      />
      <Button type="submit">Réserver</Button>
    </form>
  );
};

export default Formulaire;
