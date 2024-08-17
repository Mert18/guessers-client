"use client";
import { createGuessPaper } from "@/api/guesspaper";
import React from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../common/button/PrimaryButton";

const GuessPaper = ({
  guesses,
  totalOdds,
  stake,
  setStake,
  wins,
  roomUser,
  resetGuessPaper,
}) => {
  const { t } = useTranslation();

  const sendGuessPaper = () => {
    const guessPaperToCreate = {
      guesses: guesses,
      stake: stake,
      roomId: roomUser.room.id,
    };

    createGuessPaper(guessPaperToCreate).finally(() => {
      resetGuessPaper();
    });
  };

  return (
    <div className="col-start-1 md:col-start-4 xl:col-start-5 col-end-13 md:col-end-10 xl:col-end-9 text-text flex justify-start items-start flex-col my-4">
      <p className="text-xs mb-5">{t("currentGuessPaper")}</p>

      <div className="flex justify-between items-center w-full">
        <p className="text-xs">{t("totalOdds")}</p>
        <p className="text-sm text-secondary">{totalOdds}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="text-xs">{t("stakes")}</p>
        <select
          className="p-2 text-background"
          value={stake}
          onChange={(e) => {
            setStake(e.target.value);
          }}
        >
          <option key="100" value={100}>
            100₺
          </option>
          <option key="200" value={200}>
            200₺
          </option>
          <option key="500" value={500}>
            500₺
          </option>
          <option key="1000" value={1000}>
            1000₺
          </option>
          <option key="5000" value={5000}>
            5000₺
          </option>
          <option key="10000" value={10000}>
            10000₺
          </option>
        </select>
      </div>

      <div className="flex justify-between items-center w-full">
        <p className="text-xs">{t("wins")}</p>
        <p className="text-sm font-bold text-primary">{wins}₺</p>
      </div>

      <div className="flex justify-between items-center w-full flex-row-reverse mt-4">
        <PrimaryButton
          type="button"
          text={t("createGuessPaper")}
          noBg={true}
          onClick={() => {
            sendGuessPaper();
          }}
        />
      </div>
    </div>
  );
};

export default GuessPaper;
