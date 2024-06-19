'use client'
import React from "react";
import { useTranslation } from "react-i18next";

const BalanceWrapper = ({ balance }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center relative">
      <span className="font-bold absolute -top-4 left-0">{t("balance")}</span>

      <p className="mr-5 text-sm">
        <span className="font-bold">{balance?.toFixed(2)}₺</span>
      </p>
    </div>
  );
};

export default BalanceWrapper;
