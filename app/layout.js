"use client";
import "./globals.css";
import {  Kanit } from "next/font/google";
import SessionProviderWrapper from "@/util/sessionProviderWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../i18";
import LanguageSelector from "@/components/common/LanguageSelector";

const kanit = Kanit({ subsets: ["latin"], weight: ['400', '700'] });

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={`${kanit.className} bg-background`} style={{ position: "relative" }}>
          {/* <LanguageSelector /> */}
          <div>{children}</div>
          <ToastContainer />
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
