import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FX_CHECKER - Currency Terminal",
  description: "Financial market monitoring and real-time converter",

  authors: [{ name: "Barrie Freyre" }],

  icons: {
    icon: "/assets/favicon-32x32.png",
  },

  other: {
    linkedin: "https://www.linkedin.com/in/barriefreyre/",
    github: "https://github.com/barriedirk",
    frontendmentor: "https://www.frontendmentor.io/profile/barriedirk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Barrie Freyre",
              sameAs: [
                "https://www.linkedin.com/in/barriefreyre/",
                "https://github.com/barriedirk",
                "https://www.frontendmentor.io/profile/barriedirk",
              ],
            }),
          }}
        />
        <link rel="me" href="https://www.linkedin.com/in/barriefreyre/" />
        <link rel="me" href="https://github.com/barriedirk" />
        <link
          rel="me"
          href="https://www.frontendmentor.io/profile/barriedirk"
        />
      </head>
      <body className="bg-surface-main font-sans text-text-primary font-sans min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
