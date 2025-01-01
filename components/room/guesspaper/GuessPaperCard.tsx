import { useState } from "react";
import Modal from "../../common/Modal";
import PrimaryButton from "../../common/button/PrimaryButton";
import GuessPaperDetails from "./GuessPaperDetailsModal";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import TableCardWrapper from "@/components/common/table/TableCardWrapper";

interface IGuessPaperCardProps {
  guessPaper: IGuessPaper;
}

const GuessPaperCard = ({ guessPaper }: IGuessPaperCardProps) => {
  const [guessPaperDetailsOpen, setGuessPaperDetailsOpen] = useState(false);

  const handleCloseDetails = () => {
    setGuessPaperDetailsOpen(false);
  };

  return (
    <TableCardWrapper changeBgOnHover={false}>
        <p className="flex-1">{guessPaper.user.username}</p>

        <p
          className={`flex-1 ${
            guessPaper.status === "IN_PROGRESS"
              ? "text-warning"
              : guessPaper.status === "WON"
              ? "text-success"
              : guessPaper.status === "LOST"
              ? "text-failure"
              : "text-text-default"
          }`}
        >
          {guessPaper.status}
        </p>

        <div className="flex-1">
          <PrimaryButton
            type="button"
            text="Details"
            onClick={() => setGuessPaperDetailsOpen(true)}
          />
        </div>
      {guessPaperDetailsOpen && (
        <Modal
          title={"Guess Paper Details"}
          handleCloseModal={handleCloseDetails}
        >
          <GuessPaperDetails guessPaper={guessPaper} isShare={false} />
        </Modal>
      )}
    </TableCardWrapper>
  );
};

export default GuessPaperCard;
