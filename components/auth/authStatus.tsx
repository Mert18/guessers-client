"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status != "loading" &&
      session &&
      // @ts-ignore
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/api/auth/logout" });
    } else if (status === "unauthenticated" || !session) {
      router.push("/");
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
