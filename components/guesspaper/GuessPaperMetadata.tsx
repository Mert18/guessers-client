import { IGuessPaper } from "@/types/IGuessPaper.model";

interface IGuessPaperMetadataProps {
  guessPaper: IGuessPaper;
}

const GuessPaperMetadata = ({ guessPaper }: IGuessPaperMetadataProps) => {
  return (
    <div className="w-full my-4">
      <div className="flex justify-between w-full">
        <p className="text-primary">Status</p>
        <p>{guessPaper.status}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-primary">{"username"}</p>
        <p>{guessPaper.user.username}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-primary">{"totalOdds"}</p>
        <p>{guessPaper.totalOdd.toFixed(2)}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-primary">{"stakes"}</p>
        <p>{guessPaper.stake}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-primary">{"wins"}</p>
        <p>{guessPaper.wins}</p>
      </div>
    </div>
  );
};

export default GuessPaperMetadata;
