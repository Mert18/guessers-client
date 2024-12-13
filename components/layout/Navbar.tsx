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
        <div className="flex text-xs w-full border-b border-primary gap-2">
          <Link
            href={"/home"}
            className={`py-2 flex-1 ${
              path === "/home"
                ? "text-background-bright hover:bg-primary-bright bg-primary-default"
                : "text-primary-default hover:text-background-bright border-primary-default hover:bg-primary-default bg-background-bright"
            }  transition-all text-center border-2 flex justify-center items-center`}
          >
            <div
              className={`text-text font-bold flex justify-center items-center`}
            >
              <p>Home</p>
            </div>
          </Link>

          <Link
            href={"/home/invites"}
            className={`py-2 flex-1 ${
              path === "/home/invites"
                ? "text-background-bright hover:bg-primary-bright bg-primary-default"
                : "text-primary-default hover:text-background-bright border-primary-default hover:bg-primary-default bg-background-bright"
            }  transition-all text-center border-2 flex justify-center items-center`}
          >
            <div
              className={`text-text font-bold flex justify-center items-center`}
            >
              <p>Invites</p>
            </div>
          </Link>

          <Link
            href={"/home/room/create"}
            className={`py-2 flex-1 ${
              path === "/home/room/create"
                ? "text-background-bright hover:bg-primary-bright bg-primary-default"
                : "text-primary-default hover:text-background-bright border-primary-default hover:bg-primary-default bg-background-bright"
            }  transition-all text-center border-2 flex justify-center items-center`}
          >
            <div
              className={`text-text font-bold flex justify-center items-center`}
            >
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
                    ? "text-background-bright hover:bg-primary-bright bg-primary-default"
                    : "text-primary-default hover:text-background-bright border-primary-default hover:bg-primary-default bg-background-bright"
                }  transition-all text-center border-2 flex justify-center items-center`}
              >
                <div
                  className={`text-text font-bold flex justify-center items-center`}
                >
                  <p>Profile</p>
                </div>
              </Link>

              <Link
                href={"/"}
                className={`py-2 flex-1 text-failure hover:text-background-bright hover:bg-failure border-failure transition-all text-center border-2 flex justify-center items-center`}
                onClick={() => {
                  keycloakSessionLogOut().then(() =>
                    signOut({ callbackUrl: "/" })
                  );
                }}
              >
                <div
                  className={`text-text font-bold flex justify-center items-center`}
                >
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
    <div className="col-start-1 md:col-start-4 xl:col-start-5 col-end-13 md:col-end-10 xl:col-end-9 flex flex-col justify-between items-center text-text bg-background">
      <div className="w-full flex justify-center items-center my-4">
        <Logo />
      </div>
      <div className="relative w-full">{navbarRenderer()}</div>
    </div>
  );
};

export default Navbar;
