import { useState } from "react";
import Modal from "../../common/Modal";
import CustomButton from "../../common/CustomButton";
import GuessPaperDetails from "./GuessPaperDetailsModal";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { ColorEnum } from "@/enum/enum";

interface IGuessPaperCardProps {
  guessPaper: IGuessPaper;
}

const GuessPaperCard = ({ guessPaper }: IGuessPaperCardProps) => {
  const [guessPaperDetailsOpen, setGuessPaperDetailsOpen] = useState(false);

  const handleCloseDetails = () => {
    setGuessPaperDetailsOpen(false);
  };

  return (
    <div className="inline-block mx-1">
      <div className="rounded-md bg-primary-dark w-48 h-48 p-2 text-white flex flex-col flex-wrap">
        <div>
          <p className="opacity-50">Owner</p>
          <p>{guessPaper.user.username}</p>
        </div>
        <div>
          <p className="opacity-50">Status</p>
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
        </div>
        
        <div className="my-4">
          <CustomButton
            type="button"
            text="Details"
            onClick={() => setGuessPaperDetailsOpen(true)}
            bg={true}
            color={ColorEnum.PRIMARY}
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
