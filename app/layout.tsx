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
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <html lang="en">
      <SessionProviderWrapper>
        <GoogleAnalytics
          GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""}
        />
        <body
          className={`${font.className} grid grid-cols-12 min-h-screen text-xs md:text-sm bg-light-bg dark:bg-dark-bg`}
          style={{ position: "relative" }}
        >
          <div className="col-start-1 xl:col-start-3 col-end-13 xl:col-end-11 p-4 shadow-lg dark:border-l dark:border-r border-primary-one">
            {children}
          </div>
          <ToastContainer />
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
