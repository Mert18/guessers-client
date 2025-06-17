import ComponentTitle from "../../../common/ComponentTitle";
import GuessPaperCard from "../../guesspaper/GuessPaperCard";
import Loader from "../../../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../../../common/Pager";
import Image from "next/image";

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
      return <p className="text-primary">No Room guess papers available.</p>;
    } else {
      return (
        <div className="flex flex-col items-start justify-center w-full">
          <div className="w-full gap-1 flex flex-wrap">
            {guessPapers.map((guessPaper) => (
              <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
            ))}
          </div>
          <Pager paging={paging} setPaging={setPaging} />
        </div>
      );
    }
  };
  return (
    <div className="mt-4">
      <ComponentTitle
        text={"guessPapers"}
        icon={
          <Image
            src={"/icons/receipt.svg"}
            width={20}
            height={20}
            alt="guess-paper"
          />
        }
      />
      {roomGuessPapersRenderer()}
    </div>
  );
};

export default RoomGuessPapers;
