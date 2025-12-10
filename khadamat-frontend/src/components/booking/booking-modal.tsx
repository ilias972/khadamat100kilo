'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProService } from '@/types/api';
import apiClientInstance from '@/lib/api-client';

// Zod schema for validation
const bookingSchema = z.object({
  scheduledDate: z.string().min(1, 'La date est requise').refine((date) => {
    const selectedDate = new Date(date);
    const now = new Date();
    return selectedDate > now;
  }, 'La date doit être dans le futur'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  selectedService: ProService;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  selectedService,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    try {
      await apiClientInstance.createBooking({
        proId: selectedService.proProfileId,
        serviceCategoryId: selectedService.serviceCategoryId,
        cityId: selectedService.cityId,
        description: data.description,
        scheduledDate: data.scheduledDate,
        priceEstimate: selectedService.basePrice,
      });

      toast.success('Réservation créée avec succès !');
      onClose();
      reset();
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Erreur lors de la création de la réservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Réserver ce service">
      <div className="space-y-6">
        {/* Service Info and Price */}
        <div className="bg-surface rounded-lg p-4">
          <div className="text-center">
            <h3 className="font-semibold text-text-primary mb-2">Prix estimé</h3>
            <p className="text-2xl font-bold text-primary-500">{selectedService.basePrice} DH</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Scheduled Date */}
          <Input
            type="datetime-local"
            label="Date et heure souhaitées *"
            {...register('scheduledDate')}
            error={errors.scheduledDate?.message}
            min={new Date().toISOString().slice(0, 16)}
            data-testid="booking-date-input"
          />

          {/* Description */}
          <Textarea
            label="Description de votre besoin *"
            placeholder="Décrivez en détail ce dont vous avez besoin..."
            rows={4}
            {...register('description')}
            error={errors.description?.message}
            data-testid="booking-address-input"
          />

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#F97B22] hover:bg-[#F97B22]/90"
              disabled={loading}
              data-testid="booking-submit-button"
            >
              {loading ? 'Création en cours...' : 'Réserver ce service'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};