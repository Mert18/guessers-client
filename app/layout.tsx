import "./globals.css";
import { Kanit } from "next/font/google";
import SessionProviderWrapper from "@/util/sessionProviderWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";

const kanit = Kanit({ subsets: ["latin"], weight: ["400", "700"] });

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
          className={`${kanit.className} bg-background`}
          style={{ position: "relative" }}
        >
          <div>{children}</div>
          <ToastContainer />
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
