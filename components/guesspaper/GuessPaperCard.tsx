import { useState } from "react";
import Modal from "../Modal";
import PrimaryButton from "../common/button/PrimaryButton";
import GuessPaperDetails from "./GuessPaperDetails";
import { IGuessPaper } from "@/types/IGuessPaper.model";

interface IGuessPaperCardProps {
  guessPaper: IGuessPaper;
}

const GuessPaperCard = ({ guessPaper }: IGuessPaperCardProps) => {
  const [guessPaperDetailsOpen, setGuessPaperDetailsOpen] = useState(false);

  const handleCloseDetails = () => {
    setGuessPaperDetailsOpen(false);
  };

  return (
    <div className="w-full font-bold">
      <div className="flex justify-start items-center bg-background-bright my-1 text-primary-default border-2 border-primary-default transition-all px-2 py-3 rounded-md">
        <p className="flex-1">{guessPaper.user.username}</p>
        <p className="flex-1">{guessPaper.status}</p>
        <p className="flex-1">{guessPaper.stake.toFixed(2)}</p>
        <p className="flex-1">{guessPaper.totalOdd.toFixed(2)}</p>
        <p className="flex-1">{guessPaper.wins.toFixed(2)}</p>
        <div className="flex-1">
          <PrimaryButton
            type="button"
            text="Details"
            onClick={() => setGuessPaperDetailsOpen(true)}
          />
        </div>
      </div>
      {guessPaperDetailsOpen && (
        <Modal
          title={"Guess Paper Details"}
          handleCloseModal={handleCloseDetails}
        >
          <GuessPaperDetails guessPaper={guessPaper} />
        </Modal>
      )}
    </div>
  );
};

export default GuessPaperCard;
