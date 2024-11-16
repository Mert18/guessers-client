"use client";
import Logo from "./Logo";
import PrimaryButton from "./button/PrimaryButton";
import { signOut, useSession } from "next-auth/react";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {}
}

const Navbar = () => {
  const { data: session, status } = useSession<any>(); // TODO: fix any

  return (
    <div className="col-start-1 col-end-13 flex flex-col justify-between items-center text-text bg-background border-b border-primary">
      <div className="w-full flex justify-center items-center my-4">
        <Logo />
      </div>
      <div className="w-full flex justify-center items-center text-xs">
        <PrimaryButton type="button" text={"home"} href="/home" mr={true} />

        <PrimaryButton
          type="button"
          text={"invites"}
          href="/home/invites"
          mr={true}
        />

        <PrimaryButton
          type="button"
          text={"roomCreate"}
          href="/home/room/create"
          mr={true}
        />
        {session && (
          <>
          <PrimaryButton
          type="button"
          text={"profile"}
          href={`/home/profile/${session.username}`}
          mr={true}
        />

        <PrimaryButton
          type="button"
          text={"logout"}
          href={`/`}
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
          }}
        />
        </>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
