"use client";
import AuthStatus from "@/components/authStatus";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const HomeLayout = ({ children }) => {
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
      <div className="flex flex-col relative">
        <Navbar />
        <div className="flex justify-center items-center">{children}</div>
        <AuthStatus />
      </div>
    );
  }
};

export default HomeLayout;
