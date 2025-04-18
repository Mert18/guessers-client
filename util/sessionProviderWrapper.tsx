"use client";

import { SessionProvider } from "next-auth/react";

interface ISessionProviderWrapperProps {
  children: React.ReactNode;
}

const SessionProviderWrapper = ({ children }: ISessionProviderWrapperProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
