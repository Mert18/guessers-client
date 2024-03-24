"use client";
import Navbar from "@/components/common/Navbar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col relative">
      <Navbar />
      <div className="p-3 w-screen">{children}</div>
    </div>
  )
};

export default MainLayout;
