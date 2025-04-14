import { useState } from "react";
import Modal from "../../common/Modal";
import CustomButton from "../../common/CustomButton";
import GuessPaperDetails from "./GuessPaperDetailsModal";
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
      <div
        className={`flex justify-start items-center my-1 text-primary border-2 border-primary transition-all px-2 py-3`}
      >
        <p className="flex-1">{guessPaper.user.username}</p>
        <p
          className={`flex-1 ${
            guessPaper.status === "IN_PROGRESS"
              ? "text-warning"
              : guessPaper.status === "WON"
              ? "text-success"
              : guessPaper.status === "LOST"
              ? "text-failure"
              : "text-text"
          }`}
        >
          {guessPaper.status}
        </p>
        <p className="flex-1">{guessPaper.stake.toFixed(2)}</p>
        <p className="flex-1">{guessPaper.totalOdd.toFixed(2)}</p>
        <p className="flex-1">{guessPaper.wins.toFixed(2)}</p>
        <div className="flex-1">
          <CustomButton
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
          <GuessPaperDetails guessPaper={guessPaper} isShare={false} />
        </Modal>
      )}
    </div>
  );
};

export default GuessPaperCard;
