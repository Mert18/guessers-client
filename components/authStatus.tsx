"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import Loader from "./common/Loader";


export default function AuthStatus() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status != "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  const loginStatus = () => {
    if (status == "loading") {
      return (
        <div className="my-3">
          <Loader />
        </div>
      );
    }
  };

  return <div>{loginStatus()}</div>;
}
