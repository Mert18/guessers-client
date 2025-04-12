"use client";
import Logo from "../common/logo/Logo";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import axios from "axios";
import useIsMobile from "@/hooks/useIsMobile";
import HamburgerMenu from "../common/HamburgerMenu";
import PrimaryButton from "../common/button/PrimaryButton";
import SecondaryButton from "../common/button/SecondaryButton";

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
        <div className="flex text-sm w-full gap-2">
          <PrimaryButton type="button" href="/home" text={"Home"} bg={true} />

          <PrimaryButton
            type="button"
            href="/home/invites"
            text={"Invites"}
            bg={true}
          />
          <PrimaryButton
            type="button"
            href="/home/room/create"
            text={"Create Room"}
            bg={true}
          />

          {session && (
            <>
              <PrimaryButton
                type="button"
                // @ts-ignore
                href={`/home/profile/${session.username}`}
                text={"Profile"}
                bg={true}
              />

              <SecondaryButton
                type="button"
                href={"/"}
                text={"Logout"}
                bg={true}
                onClick={() => {
                  keycloakSessionLogOut().then(() =>
                    signOut({ callbackUrl: "/" })
                  );
                }}
              />
            </>
          )}
        </div>
      );
    }
  };
  return (
    <div>
      <div className="w-full flex justify-center items-center my-4">
        <Logo />
      </div>
      <div className="relative w-full">{navbarRenderer()}</div>
    </div>
  );
};

export default Navbar;
