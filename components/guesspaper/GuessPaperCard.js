import React, { useState } from "react";
import Modal from "../Modal";
import { t } from "i18next";
import PrimaryButton from "../common/button/PrimaryButton";
import GuessPaperDetails from "./GuessPaperDetails";

const GuessPaperCard = ({ guessPaper }) => {
  const [guessPaperDetailsOpen, setGuessPaperDetailsOpen] = useState(false);

  const handleCloseDetails = () => {
    setGuessPaperDetailsOpen(false);
  };

  return (
    <div className="w-full text-text">
      <div className="bg-background flex justify-start items-center text-text border-b border-primary">
        <p className="flex-1">{guessPaper.user.username}</p>
        <p className="flex-1">{guessPaper.status}</p>
        <p className="flex-1">{guessPaper.stake.toFixed(2)}</p>
        <p className="flex-1">{guessPaper.totalOdd.toFixed(2)}</p>
        <p className="flex-1">{guessPaper.wins.toFixed(2)}</p>
        <div className="flex-1">
          <PrimaryButton
            text="Details"
            onClick={() => setGuessPaperDetailsOpen(true)}
            
          />
        </div>
      </div>
      {guessPaperDetailsOpen && (
        <Modal
          title={t("guessPaperDetails")}
          handleCloseModal={handleCloseDetails}
        >
          <GuessPaperDetails guessPaper={guessPaper} />
        </Modal>
      )}
    </div>
  );
};

export default GuessPaperCard;
