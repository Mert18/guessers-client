import { useState } from "react";
import Modal from "../Modal";
import PrimaryButton from "../common/button/PrimaryButton";
import GuessPaperDetails from "./GuessPaperDetails";
import { IGuessPaper } from "@/types/IGuessPaper.model";

interface IGuessPaperCardProps {
  guessPaper: IGuessPaper
}

const GuessPaperCard = ({ guessPaper }: IGuessPaperCardProps) => {
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
          type="button"
            text="Details"
            onClick={() => setGuessPaperDetailsOpen(true)}
            
          />
        </div>
      </div>
      {guessPaperDetailsOpen && (
        <Modal
          title={"guessPaperDetails"}
          handleCloseModal={handleCloseDetails}
        >
          <GuessPaperDetails guessPaper={guessPaper} />
        </Modal>
      )}
    </div>
  );
};

export default GuessPaperCard;
