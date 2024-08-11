import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

const HamburgerMenu = ({
  hamburgerMenuRef,
  setHamburgerMenuOpen,
  hamburgerMenuOpen,
}) => {
  const { t } = useTranslation();
  const { data: session, status } = useSession();

  return (
    <div className="relative text-text text-xs h-full" ref={hamburgerMenuRef}>
      <button
        onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
        className="bg-background p-3 text-text flex justify-between w-full"
      >
        <Image
          src="/hamburger.svg"
          alt="hamburger menu"
          width={20}
          height={20}
        />
      </button>
      {hamburgerMenuOpen && (
        <ul className="absolute right-0 top-full w-32 bg-background border border-primary">
          <li>
            <Link href={`/home/profile/${session.username}`}>
              <p className="w-full p-2 hover:bg-secondary transition-all">
                {t("profile")}
              </p>{" "}
            </Link>
          </li>

          <li>
            <button
              className="text-white rounded w-full"
              onClick={() => {
                keycloakSessionLogOut().then(() =>
                  signOut({ callbackUrl: "/" })
                );
              }}
            >
              <p className="w-full p-2 hover:bg-failure transition-all">
                {t("logout")}
              </p>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;
