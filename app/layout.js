import "./globals.css";
import { Inter } from "next/font/google";
import SessionProviderWrapper from "@/util/sessionProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My demo",
  description: "Some description for my website",
};

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div>{children}</div>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
