"use client";
import AuthStatus from "@/components/authStatus";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import SecondaryNavbar from "@/components/common/SecondaryNavbar";
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
      <div className="grid grid-cols-12">
        <Navbar />
        <SecondaryNavbar />
        <div className="col-start-2 md:col-start-4 xl:col-start-5 col-end-12 md:col-end-10 xl:col-end-9">{children}</div>
        <AuthStatus />
      </div>
    );
  }
};