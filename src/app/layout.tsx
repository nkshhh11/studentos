import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StudentOSProvider } from '../context/StudentOSContext';
import { AppLayout } from '../components/layout/AppLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudentOS - Learn. Code. Track. Compete. Grow.',
  description: 'All-in-one operating system for engineering students & aspiring software developers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark h-full antialiased ${inter.className}`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
        <StudentOSProvider>
          <AppLayout>{children}</AppLayout>
        </StudentOSProvider>
      </body>
    </html>
  );
}
