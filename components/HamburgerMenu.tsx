import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

async function keycloakSessionLogOut() {
  await axios.get(`/api/auth/logout`);
}

const HamburgerMenu = ({ session }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  return (
    <div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div
            className={`h-1 w-6 bg-primary-default transition-all ${
              isOpen ? "my-1" : "my-0.5"
            }`}
          ></div>
          <div
            className={`h-1 w-6 bg-primary-default transition-all ${
              isOpen ? "my-1" : "my-0.5"
            }`}
          ></div>
          <div
            className={`h-1 w-6 bg-primary-default transition-all ${
              isOpen ? "my-1" : "my-0.5"
            }`}
          ></div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-background-default py-5">
          <Link
            href={"/home"}
            className={`py-2 flex-1 ${
              path === "/home"
                ? "text-background-bright hover:bg-primary-bright bg-primary-default"
                : "text-primary-default hover:text-background-bright border-primary-default hover:bg-primary-default bg-background-bright"
            }  transition-all text-center border-2 flex justify-center items-center m-2 py-4 text-xs`}
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
            }  transition-all text-center border-2 flex justify-center items-center m-2 py-4 text-xs`}
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
            }  transition-all text-center border-2 flex justify-center items-center m-2 py-4 text-xs`}
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
                }  transition-all text-center border-2 flex justify-center items-center m-2 py-4 text-xs`}
              >
                <div
                  className={`text-text font-bold flex justify-center items-center`}
                >
                  <p>Profile</p>
                </div>
              </Link>

              <Link
                href={"/"}
                className={`py-2 flex-1 text-failure hover:text-background-bright hover:bg-failure border-failure transition-all text-center border-2 flex justify-center items-center m-2 py-4 text-xs`}
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
      )}
    </div>
  );
};

export default HamburgerMenu;
