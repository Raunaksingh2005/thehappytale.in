import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "THE HAPPY TALE | Premium Kids' Celebrations & Experiences",
  description: "Customized children's celebrations and experiences brought to life. Every celebration tells a story.",
  keywords: "kids celebrations, birthday planning, children's events, party planner, themes, games, entertainment",
  authors: [{ name: "THE HAPPY TALE" }],
  openGraph: {
    title: "THE HAPPY TALE | Premium Kids' Celebrations & Experiences",
    description: "Customized children's celebrations and experiences brought to life.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
