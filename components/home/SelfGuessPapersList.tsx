import ComponentTitle from "../common/ComponentTitle";
import GuessPaperCard from "../room/guesspaper/GuessPaperCard";
import Loader from "../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";
import CustomButton from "../common/CustomButton";
import Image from "next/image";

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
        <div className="flex flex-nowrap max-w-full overflow-x-auto">
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
              />
            </div>
          )}
        </div>
      );
    }
  };
  return (
    <div className="mt-4">
      <ComponentTitle
        text="Your Guess Papers"
        icon={
          <Image
            src={"/icons/receipt.svg"}
            width={20}
            height={20}
            alt="guess-paper"
          />
        }
      />
      {selfGuessPapersRenderer()}
    </div>
  );
};

export default SelfGuessPapersList;
