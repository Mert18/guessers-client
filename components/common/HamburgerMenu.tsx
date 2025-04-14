import axios from "axios";
import { signOut } from "next-auth/react";
import { useState } from "react";
import CustomButton from "./CustomButton";
import CustomLink from "./CustomLink";
import { ColorEnum } from "@/enum/enum";
import Logo from "./logo/Logo";
import LogoWithText from "./logo/LogoWithText";

async function keycloakSessionLogOut() {
  await axios.get(`/api/auth/logout`);
}

const HamburgerMenu = ({ session }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div
            className={`h-1 w-6 bg-primary-dark transition-all ${
              isOpen ? "my-1" : "my-0.5"
            }`}
          ></div>
          <div
            className={`h-1 w-6 bg-primary-dark transition-all ${
              isOpen ? "my-1" : "my-0.5"
            }`}
          ></div>
          <div
            className={`h-1 w-6 bg-primary-dark transition-all ${
              isOpen ? "my-1" : "my-0.5"
            }`}
          ></div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full z-50 flex flex-col gradient-primary h-screen">
          <div className="flex justify-center items-center my-4">
            <LogoWithText />
          </div>
          <div>
            <CustomButton
              type="button"
              text="X"
              bg={true}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>
          <CustomLink href="/home" text={"Home"} bg={true} />
          <CustomLink href="/home/invites" text={"Invites"} bg={true} />
          <CustomLink href="/home/room/create" text={"Create Room"} bg={true} />
          {session && (
            <>
              <CustomButton
                type="button"
                // @ts-ignore
                href={`/home/profile/${session.username}`}
                text={"Profile"}
                bg={true}
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
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
