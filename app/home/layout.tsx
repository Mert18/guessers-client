"use client";
import AuthStatus from "@/components/auth/authStatus";
import BackgroundSVGs from "@/components/common/BackgroundSVGs";
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
    if (status != "loading" && (!session || status === "unauthenticated")) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex">
      <div className="p-2 bg-primary"></div>

      <div className="min-h-screen bg-gradient-white from-blue-50 to-indigo-100 p-4 w-full">
        <BackgroundSVGs />
        <div className="min-h-screen flex flex-col p-2 lg:w-2/3 w-full mx-auto bg-white shadow-lg rounded-lg z-50">
          <Navbar />
          <div className="flex-grow p-2 md:p-0">{children}</div>
          <AuthStatus />
          <Footer />
        </div>
      </div>

      <div className="p-2 bg-primary"></div>
    </div>
  );
}
