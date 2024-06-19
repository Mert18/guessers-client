"use client";
import { getRoomBetSlips } from "@/api/bet";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ComponentWithHeader from "./common/ComponentWithHeader";
import { betSlipStatusMapper } from "@/util/helper";

const PlacedBets = ({ roomId }) => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [betSlips, setBetSlips] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getRoomBetSlips(roomId, paging).then((response) => {
      setBetSlips(response.data.content);
    });
  }, []);

  const timeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    let result = "";
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
    <ul>
      {betSlips.map((betSlip) => {
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
                <b
                  className={`text-secondary-darker ${colorDeterminor(
                    betSlip.status
                  )}`}
                >
                  {t(betSlipStatusMapper(betSlip.status))}
                </b>
              </ComponentWithHeader>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PlacedBets;
