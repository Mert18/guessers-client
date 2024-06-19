"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Loader from "./common/Loader";
import { useTranslation } from "react-i18next";
import Link from "next/link";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

export default function AuthStatus() {
  const { t } = useTranslation();
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
    } else if (session) {
      return (
        <div className="">
          <Link href={`/profile/${session.username}`} className="underline">
            <span className="font-bold">{session.username}</span>{" "}
          </Link>
          <button
            className="bg-error font-bold text-white py-1 px-2 rounded border border-gray-50"
            onClick={() => {
              keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
            }}
          >
            {t("logout")}
          </button>
        </div>
      );
    } else {
      return (
        <div className="my-3">
          <button
            className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
            onClick={() => signIn("keycloak")}
          >
            {t("login")}
          </button>
        </div>
      );
    }
  };

  return <div>{loginStatus()}</div>;
}
