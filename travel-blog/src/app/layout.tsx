import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Wanderlust Chronicles - AI-Powered Travel Blog",
  description: "Discover amazing travel destinations through AI-generated daily posts and stunning photography",
  keywords: "travel, blog, AI, destinations, adventure, wanderlust",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px 16px',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
