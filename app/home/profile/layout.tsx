import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Guessers | Profile",
  description: "Guessers.io, check your latest guess papers. Check your profile information in guessers.io.",
};

interface IProfileLayoutProps {
  children?: React.ReactNode;
}

const ProfileLayout = ({ children }: IProfileLayoutProps) => {
  return <div>{children}</div>;
};

export default ProfileLayout;
