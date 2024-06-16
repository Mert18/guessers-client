'use client'
import Loader from "@/components/common/Loader";
import Navbar from "@/components/common/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const RoomLayout = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "loading") {
      return <div><Loader /></div>;
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

export default RoomLayout;
