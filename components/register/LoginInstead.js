"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { useTranslation } from "react-i18next";

const LoginInstead = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center rounded-sm m-2 transition-all text-text hover:text-primary hover:underline">
      <button className="text-sm p-2" onClick={() => signIn("keycloak")}>
        {t("loginInstead")}
      </button>
    </div>
  );
};

export default LoginInstead;
