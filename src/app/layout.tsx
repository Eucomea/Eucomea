import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eucomea - Enter Europe with Ease",
  description: "Accompagnement stratégique et interculturel pour les entreprises coréennes en Europe. EUCOMEA SAS - 60 rue François 1er, 75008 Paris.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className="font-[Outfit,sans-serif] antialiased"
      >
        {children}
      </body>
    </html>
  );
}
