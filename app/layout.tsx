import "./globals.css";
import { Rubik } from "next/font/google";
import SessionProviderWrapper from "@/util/sessionProviderWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import BetaWatermark from "@/components/layout/BetaWatermark";

const font = Rubik({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Guessers",
  description: "Just guess it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body
          className={`${font.className} bg-background-default grid grid-cols-12`}
          style={{ position: "relative" }}
        >
          <div className="col-start-1 md:col-start-4 xl:col-start-5 col-end-13 md:col-end-10 xl:col-end-9">{children}</div>
          <ToastContainer />

          <BetaWatermark />
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
