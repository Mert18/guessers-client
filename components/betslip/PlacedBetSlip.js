"use client";
import React from "react";
import ComponentWithHeader from "../common/ComponentWithHeader";
import { useTranslation } from "react-i18next";
import { betSlipStatusMapper } from "@/util/helper";

const PlacedBetSlip = ({ betSlip }) => {
  const { t } = useTranslation();
  const timeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    let result = "";
    if(diffDays > 0){
        result += diffDays + " " + t("days") + " ";
    }
    if (diffHours > 0) {
      result += diffHours + " " + t("hours") + " ";
    }
    if (diffMinutes > 0) {
      result += diffMinutes + " " + t("minutes") + " ";
    }

    if (result === "") {
      result = "1 " + t("minutes") + " ";
    }
    result += t("before");

    return result;
  };

  const colorDeterminor = (betSlipStatus) => {
    if (betSlipStatus === "LOST") {
      return "text-error";
    } else if (betSlipStatus === "WON") {
      return "text-success-darker";
    } else {
      return "text-secondary-darker";
    }
  };

  const borderDeterminor = (betSlipStatus) => {
    if (betSlipStatus === "LOST") {
      return "border-error";
    } else if (betSlipStatus === "WON") {
      return "border-success-darker";
    } else {
      return "border-secondary";
    }
  };

  return (
    <li
      key={betSlip.id}
      className={`text-primary border-2 rounded-lg my-2 text-xs
                ${borderDeterminor(betSlip.status)}
              `}
    >
      <div className="p-2 flex justify-between">
        <ComponentWithHeader name={t("username")}>
          <b className="text-secondary-darker">{betSlip.username}</b>
        </ComponentWithHeader>

        <ComponentWithHeader name={t("events")}>
          {betSlip.bets.map((bet) => {
            return (
              <div
                key={bet.id}
                className="w-64 flex justify-between text-secondary-darker"
              >
                <p>
                  <b>{bet.event.name}</b>
                </p>
                <p>
                  <b>{bet.option.name}</b>
                </p>
              </div>
            );
          })}
        </ComponentWithHeader>
        <ComponentWithHeader name={t("amount")}>
          <b className="text-secondary-darker">{betSlip.stakes}₺</b>
        </ComponentWithHeader>
        <ComponentWithHeader name={t("totalOdds")}>
          <b className="text-secondary-darker">
            {betSlip.totalOdds.toFixed(2)}
          </b>
        </ComponentWithHeader>
        <ComponentWithHeader name={t("date")}>
          <b className="text-secondary-darker">
            {timeAgo(new Date(betSlip.date))}
          </b>
        </ComponentWithHeader>
        <ComponentWithHeader name={t("status")}>
          <b className={`${colorDeterminor(betSlip.status)}`}>
            {t(betSlipStatusMapper(betSlip.status))}
          </b>
        </ComponentWithHeader>
      </div>
    </li>
  );
};

export default PlacedBetSlip;
