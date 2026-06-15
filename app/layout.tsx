import type { Metadata, Viewport } from 'next';
import JsonLd from './components/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.title}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  robots: { index: true, follow: true },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — AI Engineer & Machine Learning Developer`,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — AI Engineer`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
};

export const viewport: Viewport = {
  themeColor: '#111110',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
        <style
          dangerouslySetInnerHTML={{
            __html:
              '.loader{position:fixed;inset:0;z-index:9990;background:#111110;display:flex;align-items:center;justify-content:center}html{background:#111110}',
          }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '.page{opacity:1!important}.loader,.cursor-dot,.cursor-ring,.resume-fab{display:none!important}body.is-loading{overflow:auto;height:auto}',
            }}
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
