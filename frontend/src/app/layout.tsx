import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FranckFlights",
  description: "FlightGenerator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`body ${inter.className}`}>
        <header>
          <Header></Header>
        </header>
        <main className={`main`}>
          {children}
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
