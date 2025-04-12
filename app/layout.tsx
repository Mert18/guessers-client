import "./globals.css";
import { Jersey_10, Rubik } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import GoogleAnalytics from "@/components/external/GoogleAnalytics";
import SessionProviderWrapper from "@/util/sessionProviderWrapper";

const font = Jersey_10({ subsets: ["latin"], weight: "400" });

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
    <html lang="en">
      <SessionProviderWrapper>
        <GoogleAnalytics
          GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
        />
        <body className={`${font.className} bg-white h-screen text-black`}>
          {children}
          <ToastContainer />
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
