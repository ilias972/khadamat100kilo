'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useProDetail } from '@/hooks/use-pro-detail';
import { ProHero } from '@/components/pro/pro-hero';
import { ProServices } from '@/components/pro/pro-services';
import { ProReviews } from '@/components/pro/pro-reviews';
import { ProAbout } from '@/components/pro/pro-about';
import { ProCertifications } from '@/components/pro/pro-certifications';
import { ProWorkingHours } from '@/components/pro/pro-working-hours';
import { ProSimilarProfessionals } from '@/components/pro/pro-similar-professionals';
import { BookingModal } from '@/components/booking/booking-modal';
import { BookingCard } from '@/components/pro/booking-card';
import { ProTabs } from '@/components/pro/pro-tabs';
import { ProPortfolio } from '@/components/pro/pro-portfolio';
import { Skeleton } from '@/components/ui/skeleton';
import { mockProServices } from '@/lib/mocks/services-mocks';

export default function ProfessionalProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = params.id as string;
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('presentation');
  const { professional, isLoading, error } = useProDetail(id);

  const handleBookNow = () => {
    setBookingModalOpen(true);
  };

  const handleContact = () => {
    if (!user) {
      // Redirect to login or show message
      alert('Veuillez vous connecter pour contacter ce professionnel');
      return;
    }

    // For now, navigate to messages page
    // In a real implementation, we might create a conversation here
    router.push('/dashboard/client/messages');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb skeleton */}
            <div className="mb-8">
              <Skeleton className="h-4 w-64" />
            </div>

            {/* Hero skeleton */}
            <div className="mb-12">
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tabs skeleton */}
                <div className="border-b border-border-light">
                  <div className="flex space-x-8">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-16" />
                  </div>
                </div>

                {/* Content skeleton */}
                <div className="space-y-6">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-32 w-3/4" />
                </div>
              </div>

              {/* Sidebar skeleton */}
              <div className="space-y-6">
                <Skeleton className="h-80 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !professional) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-surface rounded-[24px] flex items-center justify-center">
                <Users className="w-12 h-12 text-text-muted" />
              </div>
              <h1 className="text-h1 font-bold text-text-primary mb-4 font-heading">
                {error || 'Professionnel non trouvé'}
              </h1>
              <p className="text-body text-text-secondary mb-6 font-body">
                Le professionnel que vous recherchez n'existe pas ou n'est plus disponible.
              </p>
              <Link href="/pros">
                <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-[24px] px-6 py-3 font-semibold transition-all duration-200">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour aux professionnels
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }


  // Helper function to render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'presentation':
        return (
          <div className="space-y-8">
            <ProAbout professional={professional} />
            <ProServices professional={professional} />
            <ProCertifications professional={professional} />
            <ProWorkingHours professional={professional} />
          </div>
        );
      case 'realisations':
        return (
          <div className="space-y-6">
            <ProPortfolio
              images={professional.portfolioImages || []}
              proName={professional.fullName}
            />
          </div>
        );
      case 'avis':
        return <ProReviews professional={professional} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-text-muted">
              <Link href="/" className="hover:text-primary-600">Accueil</Link>
              <span>/</span>
              <Link href="/pros" className="hover:text-primary-600">Professionnels</Link>
              <span>/</span>
              <span className="text-text-primary">{professional.fullName}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <ProHero
          professional={professional}
        />

        {/* Main Content Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <ProTabs activeTab={activeTab} onChange={setActiveTab} />
                  <div className="min-h-[400px]">
                    {renderTabContent()}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <BookingCard
                  professional={professional}
                  onBookNow={handleBookNow}
                  onContact={handleContact}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Similar Professionals */}
        <ProSimilarProfessionals currentProfessional={professional} />
      </main>
      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedService={professional.services && professional.services.length > 0 ? {id: professional.services[0].id, proProfileId: professional.id, serviceCategoryId: professional.serviceCategoryId, cityId: professional.cityId, basePrice: professional.startingPrice, description: professional.services[0].description, isActive: true, createdAt: new Date(), updatedAt: new Date()} : {id: 'temp-service-id', proProfileId: mockProServices[0].proId, serviceCategoryId: mockProServices[0].category, cityId: '1', basePrice: mockProServices[0].price, description: mockProServices[0].description, isActive: true, createdAt: new Date(), updatedAt: new Date()}}
      />
    </div>
  );
}