import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { ToastProvider } from '@/lib/toast-context';
import { PageTransitionProvider } from '@/components/ui/page-transition';
import { Providers } from '@/lib/providers';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Khadamat - Services à domicile au Maroc',
    template: '%s | Khadamat',
  },
  description: 'Trouvez et réservez les meilleurs professionnels pour vos travaux à domicile. Plomberie, électricité, ménage, jardinage et plus encore au Maroc.',
  keywords: [
    'services domicile Maroc',
    'professionnels maison',
    'plomberie Casablanca',
    'électricité Rabat',
    'ménage Marrakech',
    'jardinage Maroc',
    'réparations domicile',
    'artisans qualifiés',
    'services locaux',
    'professionnels vérifiés'
  ],
  authors: [{ name: 'Khadamat Team' }],
  creator: 'Khadamat',
  publisher: 'Khadamat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://khadamat.ma'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-MA': '/',
      'ar-MA': '/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://khadamat.ma',
    title: 'Khadamat - Services à domicile au Maroc',
    description: 'Trouvez et réservez les meilleurs professionnels pour vos travaux à domicile. Plus de 1000 professionnels vérifiés au Maroc.',
    siteName: 'Khadamat',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Khadamat - Services à domicile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khadamat - Services à domicile au Maroc',
    description: 'Trouvez et réservez les meilleurs professionnels pour vos travaux à domicile.',
    images: ['/og-image.jpg'],
    creator: '@khadamat_ma',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning={true}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Fonts loaded via Google Fonts or system fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
            }
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased relative bg-moroccan-pattern`}>
        <Providers>
          <div className="relative z-10">
            <PageTransitionProvider defaultType="moroccan-fade">
              <ToastProvider>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </ToastProvider>
            </PageTransitionProvider>
          </div>
          <Toaster position="top-right" richColors />
        </Providers>

        {/* Analytics (would be implemented with actual tracking) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Analytics placeholder
              console.log('Analytics would be initialized here');
            `,
          }}
        />
      </body>
    </html>
  );
}
