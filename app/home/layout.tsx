"use client";
import AuthStatus from "@/components/auth/authStatus";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IHomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: IHomeLayoutProps) {
  const [theme, setTheme] = useState("light");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || status === "unauthenticated") {
      router.push("/");
    }
  }, [session]);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow p-2 md:p-0">{children}</div>
      <AuthStatus />
      <button
        onClick={toggleTheme}
        className="flex justify-center items-center absolute top-3 right-3"
      >
        {theme == "light" ? (
          <Image src={"/icons/moon.svg"} width={20} height={20} alt="moon" />
        ) : (
          <Image src="/icons/sun.svg" width={20} height={20} alt="sun" />
        )}
      </button>
      <Footer />
    </div>
  );
}
