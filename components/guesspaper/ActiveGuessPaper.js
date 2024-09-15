"use client";
import { createGuessPaper } from "@/api/guesspaper";
import React from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../common/button/PrimaryButton";
import ComponentTitle from "../common/ComponentTitle";
import CustomSelect from "../form/CustomSelect";

const ActiveGuessPaper = ({
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

  const stakeOptions = [
    { value: 100, label: '100' },
    { value: 200, label: '200' },
    { value: 500, label: '500' },
    { value: 1000, label: '1000' },
    { value: 5000, label: '5000' },
    { value: 10000, label: '10000' },
  ];

  return (
    <div className="flex justify-start items-start text-text flex-col my-8">
      <ComponentTitle text={t("currentGuessPaper")} icon="/ticket.svg" />

      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-center items-start w-full">
          <p className="text-xs">{t("totalOdds")}</p>
          <p className="text-sm text-primary font-bold">{totalOdds}</p>
        </div>
        <div className="flex flex-col justify-center items-start w-full">
          <p className="text-xs">{t("stakes")}</p>
          <CustomSelect
            options={stakeOptions}
            value={stakeOptions.find(option => option.value === stake)}
            onChange={(selectedOption) => setStake(selectedOption.value)}
            placeholder={t("selectStake")}
            width="2/3"
          />
        </div>

        <div className="flex flex-col justify-center items-start w-full">
          <p className="text-xs">{t("wins")}</p>
          <p className="text-sm font-bold text-primary">{wins}₺</p>
        </div>

        <div className="flex flex-col justify-center items-start w-full">
          <PrimaryButton
            type="button"
            text={t("createGuessPaper")}
            
            onClick={() => {
              sendGuessPaper();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveGuessPaper;
