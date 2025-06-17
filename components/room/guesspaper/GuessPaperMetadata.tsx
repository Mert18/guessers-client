import TokenSymbol from "@/components/common/TokenSymbol";
import { IGuessPaper } from "@/types/IGuessPaper.model";

interface IGuessPaperMetadataProps {
  guessPaper: IGuessPaper;
}

const GuessPaperMetadata = ({ guessPaper }: IGuessPaperMetadataProps) => {
  return (
    <div className="w-full flex justify-center items-center my-4">
      <div className="w-full">
        <div className="flex justify-between w-full">
          <p className="font-medium">Username</p>
          <p>{guessPaper.user.username}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-medium">Status</p>
          <p
            className={`${
              guessPaper.status === "IN_PROGRESS"
                ? "text-warning"
                : guessPaper.status === "WON"
                ? "text-success"
                : guessPaper.status === "LOST"
                ? "text-failure"
                : ""
            }`}
          >
            {guessPaper.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuessPaperMetadata;
