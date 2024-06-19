"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import SessionProviderWrapper from "@/util/sessionProviderWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../i18";
import LanguageSelector from "@/components/common/LanguageSelector";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={inter.className} style={{ position: "relative" }}>
          <LanguageSelector />
          <div>{children}</div>
          <ToastContainer />
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
