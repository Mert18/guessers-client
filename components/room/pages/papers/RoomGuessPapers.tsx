import ComponentTitle from "../../../common/ComponentTitle";
import GuessPaperCard from "../../guesspaper/GuessPaperCard";
import Loader from "../../../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../../../common/table/Pager";
import TableEmptyInfo from "@/components/common/table/TableEmptyInfo";

interface IRoomGuessPapersProps {
  guessPapers: IGuessPaper[];
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
  loading: boolean;
}

const RoomGuessPapers = ({
  guessPapers,
  paging,
  setPaging,
  loading,
}: IRoomGuessPapersProps) => {
  const roomGuessPapersRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (guessPapers.length === 0) {
      return <TableEmptyInfo text="No Room guess papers available." />;
    } else {
      return (
        <div className="w-full">
          <div className="bg-primary-default p-2 flex justify-start items-center text-background-bright font-bold border-2 border-primary-default">
            <h2 className="flex-1">{"Username"}</h2>
            <h2 className="flex-1">{"Status"}</h2>
            <h2 className="flex-1">{"Details"}</h2>
          </div>
          {guessPapers.map((guessPaper) => (
            <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
          ))}
          <Pager paging={paging} setPaging={setPaging} />
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
