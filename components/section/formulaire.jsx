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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        console.log('Email envoyé avec succès');
      } else {
        console.error("Erreur lors de l'envoi de l'email");
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
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
      <Textarea
        name="message"
        placeholder="Message (si besoin)"
        value={formData.message}
        onChange={handleChange}
        aria-label="Message"
      />
      <Button type="submit">Réserver</Button>
    </form>
  );
};

export default Formulaire;
