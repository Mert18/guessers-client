"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import HamburgerMenu from "../navbar/HamburgerMenu";
import { getInvites } from "@/api/user";
import InvitesWrapper from "../navbar/InvitesWrapper";
import PrimaryButton from "./button/PrimaryButton";
import { t } from "i18next";

const Navbar = () => {
  const [invitesMenuOpen, setInvitesMenuOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const hamburgerMenuRef = useRef(null);
  const invitesMenuRef = useRef(null);

  useEffect(() => {
    getInvites().then((response) => {
      setInvites(response.data);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        invitesMenuRef.current &&
        !invitesMenuRef.current.contains(event.target)
      ) {
        setInvitesMenuOpen(false);
      }
      if (
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(event.target)
      ) {
        setHamburgerMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center text-text bg-background p-2 border-b border-primary">
      <Logo />

      <div className="flex justify-end items-center text-text text-xs w-full">
        <InvitesWrapper
          invitesMenuRef={invitesMenuRef}
          setInvitesMenuOpen={setInvitesMenuOpen}
          invitesMenuOpen={invitesMenuOpen}
          invites={invites}
        />

        <div className="mr-8 flex justify-center items-center h-full">
          <PrimaryButton
            text={t("roomCreate")}
            href="/home/room/create"
            noBg={true}
          />
        </div>

        <HamburgerMenu
          hamburgerMenuRef={hamburgerMenuRef}
          setHamburgerMenuOpen={setHamburgerMenuOpen}
          hamburgerMenuOpen={hamburgerMenuOpen}
        />
      </div>
    </div>
  );
};

export default Navbar;
