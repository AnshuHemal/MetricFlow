import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});
export const metadata: Metadata = {
  title: "MetricFlow - Modern Website Analytics",
  description:
    "Understand your website visitors and grow your business with actionable insights from MetricFlow analytics platform.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/icon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="shortcut icon" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/icon.svg" />
          <script
            defer
            data-website-id="a727880e-f529-4e94-b282-8d6dfc1bf5c9"
            data-domain="https://metricflow-web.vercel.app/"
            src="https://metricflow-web.vercel.app/analytics.js"
          ></script>
        </head>
        <body className={`${poppins.className} ${poppins.variable}`}>
          <Provider>{children}</Provider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
