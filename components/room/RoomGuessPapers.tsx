import ComponentTitle from "../common/ComponentTitle";
import GuessPaperCard from "../guesspaper/GuessPaperCard";
import Loader from "../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";

interface IRoomGuessPapersProps {
  guessPapers: IGuessPaper[];
  setPaging: (paging: number) => void;
  loading: boolean;
}

const RoomGuessPapers = ({ guessPapers, setPaging, loading }: IRoomGuessPapersProps) => {

  const roomGuessPapersRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (guessPapers.length === 0) {
      return <p className="text-primary">No Room guess papers available.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary text-xs">
            <h2 className="flex-1">{"username"}</h2>
            <h2 className="flex-1">{"status"}</h2>
            <h2 className="flex-1">{"stakes"}</h2>
            <h2 className="flex-1">{"odds"}</h2>
            <h2 className="flex-1">{"wins"}</h2>
            <h2 className="flex-1">{"details"}</h2>
          </div>
          {guessPapers.map((guessPaper) => (
            <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
          ))}
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text={"guessPapers"} icon="/ticket.svg" />
      {roomGuessPapersRenderer()}
    </div>
  );
};

export default RoomGuessPapers;
