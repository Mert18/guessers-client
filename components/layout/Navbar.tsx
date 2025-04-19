"use client";
import Logo from "../common/logo/Logo";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import useIsMobile from "@/hooks/useIsMobile";
import HamburgerMenu from "../common/HamburgerMenu";
import CustomButton from "../common/CustomButton";
import CustomLink from "../common/CustomLink";
import { ColorEnum } from "@/enum/enum";
import Image from "next/image";

async function keycloakSessionLogOut() {
  await axios.get(`/api/auth/logout`);
}

const Navbar = () => {
  const { data: session, status } = useSession<any>(); // TODO: fix any
  const isMobile = useIsMobile();

  const navbarRenderer = () => {
    if (isMobile) {
      return <HamburgerMenu session={session} />;
    } else {
      return (
        <div className="flex text-sm gap-2 w-full mx-auto">
          <CustomLink
            href="/home"
            text={"Home"}
            bg={true}
            icon={
              <Image
                src={"/icons/home.svg"}
                width={15}
                height={15}
                alt="door"
              />
            }
          />

          <CustomLink
            href="/home/room/create"
            text={"Create Room"}
            bg={true}
            icon={
              <Image
                src={"/icons/create.svg"}
                width={15}
                height={15}
                alt="door"
              />
            }
          />

          {session && (
            <>
              <CustomLink
                // @ts-ignore
                href={`/home/profile/${session.username}`}
                text={"Profile"}
                bg={true}
                icon={
                  <Image
                    src={"/icons/user.svg"}
                    width={15}
                    height={15}
                    alt="door"
                  />
                }
              />

              <CustomButton
                type="button"
                text={"Logout"}
                bg={true}
                onClick={() => {
                  keycloakSessionLogOut().then(() =>
                    signOut({ callbackUrl: "/" })
                  );
                }}
                color={ColorEnum.FAILURE}
                icon={
                  <Image
                    src={"/icons/door.svg"}
                    width={15}
                    height={15}
                    alt="door"
                  />
                }
              />
            </>
          )}
        </div>
      );
    }
  };
  return (
    <div>
      <div className="w-full flex justify-center items-center my-4 relative">
        <Logo />
      </div>
      <div className="w-full">{navbarRenderer()}</div>
    </div>
  );
};

export default Navbar;
