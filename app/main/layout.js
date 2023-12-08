"use client";
import AuthStatus from "@/components/authStatus";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col relative">
      <div>
        <AuthStatus />
      </div>
      <div className="p-3 w-screen">{children}</div>
    </div>
  )
};

export default MainLayout;
