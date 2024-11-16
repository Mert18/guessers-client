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
    <div className="col-start-1 md:col-start-4 xl:col-start-5 col-end-13 md:col-end-10 xl:col-end-9 flex flex-col justify-between items-center text-text bg-background">
      <div className="w-full flex justify-center items-center my-4">
        <Logo />
      </div>
      <div className="flex text-xs w-full border-b border-primary">
        <PrimaryButton type="button" text={"Home"} href="/home" />

        <PrimaryButton type="button" text={"Invites"} href="/home/invites" />

        <PrimaryButton
          type="button"
          text={"Create Room"}
          href="/home/room/create"
        />
        {session && (
          <>
            <PrimaryButton
              type="button"
              text={"Profile"}
              href={`/home/profile/${session.username}`}
            />

            <PrimaryButton
              type="button"
              text={"Logout"}
              href={`/`}
              onClick={() => {
                keycloakSessionLogOut().then(() =>
                  signOut({ callbackUrl: "/" })
                );
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
