import ComponentTitle from "../../../common/ComponentTitle";
import GuessPaperCard from "../../guesspaper/GuessPaperCard";
import Loader from "../../../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../../../common/Pager";

interface IRoomGuessPapersProps {
  guessPapers: IGuessPaper[];
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
  loading: boolean;
}

const RoomGuessPapers = ({ guessPapers, paging, setPaging, loading }: IRoomGuessPapersProps) => {

  const roomGuessPapersRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (guessPapers.length === 0) {
      return <p className="text-primary">No Room guess papers available.</p>;
    } else {
      return (
        <div className="w-full">
          {guessPapers.map((guessPaper) => (
            <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
          ))}
          <Pager paging={paging} setPaging={setPaging} />
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-sm">
      <ComponentTitle text={"guessPapers"} icon="/ticket.svg" />
      {roomGuessPapersRenderer()}
    </div>
  );
};

export default RoomGuessPapers;
