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
import { DatePickerA } from '@/components/ui/DatePickerA';
import { DatePickerD } from '@/components/ui/DatePickerD';
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
    numberOfPeople: '',
    numberOfChildren: '',
    numberOfBebe: '',
    pets: '',
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

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.arrivalDate ||
      !formData.departureDate ||
      !formData.house ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.numberOfPeople
    ) {
      setErrorMessage(
        '🛑 Veuillez remplir tous les champs avec un astérixe ( * ).',
      );
      setSuccessMessage(''); // Réinitialise le message de succès si une erreur apparaît
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        console.log('✅ Email envoyé avec succès');
        setSuccessMessage(
          '✅ Le formulaire a été bien envoyé, nous reviendrons vers vous rapidement',
        );
        setFormData({
          arrivalDate: '',
          departureDate: '',
          house: '',
          firstName: '',
          lastName: '',
          address: '',
          email: '',
          phone: '',
          numberOfPeople: '',
          numberOfChildren: '',
          pets: '',
          message: '',
        }); // Réinitialisation du formulaire
      } else {
        console.error('❌ Erreur lors de l’envoi');
        setErrorMessage('❌ Une erreur est survenue lors de l’envoi.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('🌐 Erreur réseau:', error);
      setErrorMessage('❌ Problème de connexion. Réessayez plus tard.');
      setSuccessMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-3 my-6 md:my-12">
      <div className=" flex flex-col md:flex-row gap-3">
        <div className=" flex flex-col gap-3 md:w-1/2">
          <div className="flex gap-3 ">
            <DatePickerA
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={(date) => handleDateChange(date, 'arrivalDate')}
            />
            <DatePickerD
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
            <SelectTrigger>
              <span
                className={formData.house ? 'text-black' : 'text-stone-500'}
              >
                {formData.house ? formData.house : 'Quelle maison *'}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house1">Maison 1</SelectItem>
              <SelectItem value="house2">Maison 2</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-3">
            <Input
              name="firstName"
              placeholder="Prénom *"
              value={formData.firstName}
              onChange={handleChange}
              aria-label="Prénom"
            />
            <Input
              name="lastName"
              placeholder="Nom *"
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
            placeholder="Email *"
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
            placeholder="Nombre d'adultes *"
            value={formData.numberOfPeople}
            onChange={handleChange}
            aria-label="Nombre d'adultes"
          />

          <Input
            name="numberOfChildren"
            placeholder="Nombre d'enfants"
            value={formData.numberOfChildren}
            onChange={handleChange}
            aria-label="Nombre d'enfants"
          />

          <Input
            name="numberOfBebe"
            placeholder="Nombre de bébé"
            value={formData.numberOfBebe}
            onChange={handleChange}
            aria-label="Nombre de bébé"
          />

          <Input
            name="pets"
            placeholder="Animaux"
            value={formData.pets}
            onChange={handleChange}
            aria-label="Animaux"
          />
        </div>
        <div className=" flex flex-col mt-0 h-64 md:h-auto md:w-1/2 gap-3">
          <Textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            aria-label="Message"
          />
        </div>
      </div>
      <div className=" flex flex-col md:flex-row gap-3 items-center md:mb-0 mb-6">
        <Button type="submit" size="m" className="w-full md:w-1/2">
          Demande de réservation
        </Button>
        <p
          className={`text-base font-semibold w-1/2 text-center 
  ${errorMessage ? 'text-red-500' : successMessage ? 'text-green-500' : 'text-gray-500'}`}
        >
          {errorMessage || successMessage || ''}
        </p>
      </div>
    </form>
  );
};

export default Formulaire;
