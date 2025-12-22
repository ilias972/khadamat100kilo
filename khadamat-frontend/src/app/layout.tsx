import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { ToastProvider } from '@/lib/toast-context';
import { PageTransitionProvider } from '@/components/ui/page-transition';
import { Providers } from '@/lib/providers';
import { Toaster } from 'sonner';
// 👇 1. IMPORT DU FOOTER
import { Footer } from '@/components/layout/footer';

const inter = { className: 'font-sans', variable: 'font-sans' };

export const metadata: Metadata = {
  title: {
    default: 'Khadamat - Services à domicile au Maroc',
    template: '%s | Khadamat',
  },
  description: 'Trouvez et réservez les meilleurs professionnels pour vos travaux à domicile.',
  keywords: ['services domicile Maroc', 'professionnels maison', 'artisans qualifiés'],
  authors: [{ name: 'Khadamat Team' }],
  metadataBase: new URL('https://khadamat.ma'),
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased relative bg-moroccan-pattern`}>
        <Providers>
          <div className="relative z-10 flex flex-col min-h-screen"> 
            {/* 👆 J'ai ajouté flex flex-col min-h-screen pour que le footer reste en bas */}
            
            <PageTransitionProvider defaultType="moroccan-fade">
              <ToastProvider>
                <AuthProvider>
                  <main className="flex-grow">
                    {children}
                  </main>
                  {/* 👇 2. PLACEMENT DU FOOTER ICI */}
                  <Footer /> 
                </AuthProvider>
              </ToastProvider>
            </PageTransitionProvider>
          </div>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}