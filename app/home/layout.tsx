"use client";
import AuthStatus from "@/components/auth/authStatus";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IHomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: IHomeLayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if(!session || status === "unauthenticated") {
        router.push("/");
      }
    }, [session])
  
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow p-2 md:p-0">{children}</div>
        <AuthStatus />
        <Footer />
      </div>
  );
}
