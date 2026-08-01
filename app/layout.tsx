import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ORAVÈ — 100% Online Beauty Store in Bangladesh",
    template: "%s · ORAVÈ",
  },
  description:
    "ORAVÈ is a 100% online-only cosmetics and beauty store offering Bangladesh-wide home delivery of authentic imports from South Korea, Japan, the USA and China.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#171210" },
  ],
};

const themeBootScript = `
  (function () {
    try {
      var saved = localStorage.getItem('hb-theme');
      document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
    } catch (_) {
      document.documentElement.dataset.theme = 'light';
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
