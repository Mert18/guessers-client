"use client";
import Link from "next/link";
import Logo from "../common/Logo";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import axios from "axios";
import useIsMobile from "@/hooks/useIsMobile";
import HamburgerMenu from "../common/HamburgerMenu";

async function keycloakSessionLogOut() {
  await axios.get(`/api/auth/logout`);
}

const Navbar = () => {
  const { data: session, status } = useSession<any>(); // TODO: fix any
  const path = usePathname();
  const isMobile = useIsMobile();

  const navbarRenderer = () => {
    if (isMobile) {
      return <HamburgerMenu session={session} />;
    } else {
      return (
        <div className="flex text-xs w-full gap-2">
          <Link
            href={"/home"}
            className={`py-2 flex-1 ${
              path === "/home"
                ? "bg-primary-one text-dark-text"
                : "bg-light-bg-sec dark:bg-dark-bg-sec text-light-text dark:text-dark-text"
            }  transition-all text-center rounded-sm flex justify-center items-center hover:bg-primary-one-hover hover:text-light-bg`}
          >
            <div className={`font-bold flex justify-center items-center`}>
              <p>Home</p>
            </div>
          </Link>

          <Link
            href={"/home/invites"}
            className={`py-2 flex-1 ${
              path === "/home/invites"
                ? "bg-primary-one text-dark-text"
                : "bg-light-bg-sec dark:bg-dark-bg-sec text-light-text dark:text-dark-text"
            }  transition-all text-center rounded-sm flex justify-center items-center hover:bg-primary-one-hover hover:text-light-bg`}
          >
            <div className={`font-bold flex justify-center items-center`}>
              <p>Invites</p>
            </div>
          </Link>

          <Link
            href={"/home/room/create"}
            className={`py-2 flex-1 ${
              path === "/home/room/create"
                ? "bg-primary-one text-dark-text"
                : "bg-light-bg-sec dark:bg-dark-bg-sec text-light-text dark:text-dark-text"
            }  transition-all text-center rounded-sm flex justify-center items-center hover:bg-primary-one-hover hover:text-light-bg`}
          >
            <div className={`font-bold flex justify-center items-center`}>
              <p>Create Room</p>
            </div>
          </Link>

          {session && (
            <>
              <Link
                // @ts-ignore
                href={`/home/profile/${session.username}`}
                className={`py-2 flex-1 ${
                  // @ts-ignore
                  path === `/home/profile/${session.username}`
                    ? "bg-primary-one text-dark-text"
                    : "bg-light-bg-sec dark:bg-dark-bg-sec text-light-text dark:text-dark-text"
                }  transition-all text-center rounded-sm flex justify-center items-center hover:bg-primary-one-hover hover:text-light-bg`}
              >
                <div className={`font-bold flex justify-center items-center`}>
                  <p>Profile</p>
                </div>
              </Link>

              <Link
                href={"/"}
                className={`p-2 transition-all text-center rounded-sm flex justify-center items-center
                  bg-light-bg-sec dark:bg-dark-bg-sec text-light-text dark:text-dark-text hover:bg-feedback-failure hover:text-light-bg`}
                onClick={() => {
                  keycloakSessionLogOut().then(() =>
                    signOut({ callbackUrl: "/" })
                  );
                }}
              >
                <div className={`font-bold flex justify-center items-center `}>
                  <p>Logout</p>
                </div>
              </Link>
            </>
          )}
        </div>
      );
    }
  };
  return (
    <div className="col-start-1 md:col-start-4 xl:col-start-5 col-end-13 md:col-end-10 xl:col-end-9 flex flex-col justify-between items-center bg-background">
      <div className="w-full flex justify-center items-center my-4">
        <Logo />
      </div>
      <div className="relative w-full">{navbarRenderer()}</div>
    </div>
  );
};

export default Navbar;
