"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import PrimaryButton from "./button/PrimaryButton";
import { signIn } from "next-auth/react";
import { t } from "i18next";
import RegisterModal from "../navbar/RegisterModal";

const NavbarNoAuth = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  return (
    <div className="flex justify-between items-center text-text bg-background p-2 border-b border-primary">
      <Logo />

      <div className="flex items-center justify-center mr-4">
        <div className="relative">
          <PrimaryButton text={t("register")} onClick={() => setRegisterModalOpen(!registerModalOpen)} noBg={true} />
        {registerModalOpen && (
            <RegisterModal setRegisterModalOpen={setRegisterModalOpen} />
          )}
        </div>

        <PrimaryButton
          text={t("login")}
          onClick={() => signIn("keycloak")}
          noBg={true}
          external={true}
        />
      </div>
    </div>
  );
};

export default NavbarNoAuth;
