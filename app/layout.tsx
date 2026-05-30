import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CompareBar from '@/components/layout/CompareBar';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: { default: 'FindMyCar — India\'s Car Research Platform', template: '%s | FindMyCar' },
  description: 'Compare cars, check safety ratings, read reviews and find the perfect car for your budget in India.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <AppProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <CompareBar />
        </AppProvider>
      </body>
    </html>
  );
}
