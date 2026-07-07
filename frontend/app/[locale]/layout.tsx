import "../globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FX_CHECKER - Currency Terminal",
  description: "Financial market monitoring and real-time converter",
  authors: [{ name: "Barrie Freyre" }],
  icons: { icon: "/assets/favicon-32x32.png" },
  other: {
    linkedin: "https://www.linkedin.com/in/barriefreyre/",
    github: "https://github.com/barriedirk",
    frontendmentor: "https://www.frontendmentor.io/profile/barriedirk",
  },
};

interface LocaleLayoutProps {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Barrie Freyre",
    sameAs: [
      "https://www.linkedin.com/in/barriefreyre/",
      "https://github.com/barriedirk",
      "https://www.frontendmentor.io/profile/barriedirk",
    ],
  };

  const safeJsonLd = JSON.stringify(jsonLdData)
    .replaceAll("<", String.raw`\u003c`)
    .replaceAll(">", String.raw`\u003e`)
    .replaceAll("\u2028", String.raw`\u2028`)
    .replaceAll("\u2029", String.raw`\u2029`);

  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
        <link rel="me" href="https://www.linkedin.com/in/barriefreyre/" />
        <link rel="me" href="https://github.com/barriedirk" />
        <link
          rel="me"
          href="https://www.frontendmentor.io/profile/barriedirk"
        />
      </head>

      <body className="bg-surface-main font-sans text-text-primary min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
