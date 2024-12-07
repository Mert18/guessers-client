"use client";
import AuthStatus from "@/components/authStatus";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface IHomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: IHomeLayoutProps){
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  } else if(!session) {
    router.push("/");
  } else if (session) {
    return (
      <>
        <Navbar />
        <>{children}</>
        <AuthStatus />
      </>
    );
  }
};