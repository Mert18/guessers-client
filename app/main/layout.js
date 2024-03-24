"use client";
import Navbar from "@/components/common/Navbar";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const MainLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div>Loading...</div>;
  }else if (!session) {
    router.push("/");
  }else if (session) {
    return (
      <div className="flex flex-col relative">
        <Navbar />
        <div className="p-3 w-screen">{children}</div>
      </div>
    );
  }
};

export default MainLayout;
