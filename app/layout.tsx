import "./globals.css";
import { Rubik } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import GoogleAnalytics from "@/components/external/GoogleAnalytics";
import SessionProviderWrapper from "@/util/sessionProviderWrapper";

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
    <html lang="en">
      <SessionProviderWrapper>
        <GoogleAnalytics
          GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
        />
        <body
          className={`${font.className} bg-background-default grid grid-cols-12 min-h-screen`}
          style={{ position: "relative" }}
        >
          <div className="col-start-1 md:col-start-4 xl:col-start-5 col-end-13 md:col-end-10 xl:col-end-9 bg-background-bright p-4 shadow-lg">
            {children}
          </div>
          <ToastContainer />
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
