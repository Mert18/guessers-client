import ComponentTitle from "../common/ComponentTitle";
import GuessPaperCard from "../guesspaper/GuessPaperCard";
import Loader from "../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";

interface ISelfGuessPapersListProps {
  selfGuessPapers: IGuessPaper[];
  paging: IPaging;
  setPaging: (paging: IPaging) => void;
  loading: boolean;
}

const SelfGuessPapersList = ({
  selfGuessPapers,
  paging,
  setPaging,
  loading,
}: ISelfGuessPapersListProps) => {
  const selfGuessPapersRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (selfGuessPapers.length === 0) {
      return <p className="text-primary">No guess papers available.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
            <h2 className="flex-1">{"username"}</h2>
            <h2 className="flex-1">{"status"}</h2>
            <h2 className="flex-1">{"stakes"}</h2>
            <h2 className="flex-1">{"optionOdds"}</h2>
            <h2 className="flex-1">{"wins"}</h2>
            <h2 className="flex-1">{"details"}</h2>
          </div>
          {selfGuessPapers.map((guessPaper) => (
            <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
          ))}
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text="Self Guess Papers" icon="/ticket.svg" />
      {selfGuessPapersRenderer()}
    </div>
  );
};

export default SelfGuessPapersList;
