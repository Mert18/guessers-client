"use client";
import Link from "next/link";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {}
}

const Navbar = () => {
  const { data: session, status } = useSession<any>(); // TODO: fix any
  const path = usePathname();

  return (
    <div className="col-start-1 md:col-start-4 xl:col-start-5 col-end-13 md:col-end-10 xl:col-end-9 flex flex-col justify-between items-center text-text bg-background">
      <div className="w-full flex justify-center items-center my-4">
        <Logo />
      </div>
      <div className="flex text-xs w-full border-b border-primary gap-2">
        <Link
          href={"/home"}
          className={`py-2 flex-1 ${
            path === "/home"
              ? "text-background-bright hover:bg-primary-bright bg-primary-default"
              : "text-primary-default hover:text-background-bright border-primary-default hover:bg-primary-default bg-background-bright"
          }  transition-all text-center rounded-md border-2`}
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
          }  transition-all text-center rounded-md border-2`}
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
          }  transition-all text-center rounded-md border-2`}
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
              href={`/home/profile/${session.username}`}
              className={`py-2 flex-1 ${
                path === `/home/profile/${session.username}`
                  ? "text-background-bright hover:bg-primary-bright bg-primary-default"
                  : "text-primary-default hover:text-background-bright border-primary-default hover:bg-primary-default bg-background-bright"
              }  transition-all text-center rounded-md border-2`}
            >
              <div
                className={`text-text font-bold flex justify-center items-center`}
              >
                <p>Profile</p>
              </div>
            </Link>

            <Link
              href={"/"}
              className={`py-2 flex-1 text-failure hover:text-background-bright hover:bg-failure border-failure transition-all text-center rounded-md border-2`}
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
    </div>
  );
};

export default Navbar;