import ComponentTitle from "../common/ComponentTitle";
import GuessPaperCard from "../room/guesspaper/GuessPaperCard";
import Loader from "../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../common/Pager";
import CustomButton from "../common/CustomButton";
import { ColorEnum } from "@/enum/enum";

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
  const handleLoadMoreSelfGuessPapers = () => {
    setPaging((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const selfGuessPapersRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (selfGuessPapers.length === 0) {
      return <p className="text-primary">No guess papers available.</p>;
    } else {
      return (
        <div className="flex flex-nowrap max-w-full overflow-x-auto py-2">
          {selfGuessPapers.map((guessPaper) => (
            <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
          ))}

          {paging.totalElements !== selfGuessPapers.length && (
            <div className="w-48">
              <CustomButton
                onClick={() => handleLoadMoreSelfGuessPapers()}
                type="button"
                text="Load More >>>"
                bg={true}
                color={ColorEnum.SECONDARY}
              />
            </div>
          )}
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-sm">
      <ComponentTitle text="Your Guess Papers" icon="/ticket.svg" />
      {selfGuessPapersRenderer()}
    </div>
  );
};

export default SelfGuessPapersList;
