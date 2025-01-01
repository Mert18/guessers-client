import ComponentTitle from "../common/ComponentTitle";
import GuessPaperCard from "../room/guesspaper/GuessPaperCard";
import Loader from "../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../common/table/Pager";
import TableHeader from "../common/table/TableHeader";
import TableEmptyInfo from "../common/table/TableEmptyInfo";
import TableWrapper from "../common/table/TableWrapper";

interface ISelfGuessPapersListProps {
  selfGuessPapers: IGuessPaper[];
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
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
    } else {
      return (
        <TableWrapper>
          <TableHeader columns={["Username", "Status", "Details"]} />
          {selfGuessPapers.length === 0 ? (
            <TableEmptyInfo text="No guess papers available." />
          ) : (
            <>
              {selfGuessPapers.map((guessPaper) => (
                <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
              ))}

              <Pager paging={paging} setPaging={setPaging} />
            </>
          )}
        </TableWrapper>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text="Your Guess Papers" icon="/ticket.svg" />
      {selfGuessPapersRenderer()}
    </div>
  );
};

export default SelfGuessPapersList;
