import ComponentTitle from "../common/ComponentTitle";
import GuessPaperCard from "../room/guesspaper/GuessPaperCard";
import Loader from "../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../common/Pager";
import CustomButton from "../common/CustomButton";
import { ColorEnum } from "@/enum/enum";
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
      return <p className="text-primary text-lg">No guess papers available.</p>;
    } else {
      return (
        <div className="flex flex-nowrap max-w-full overflow-x-auto py-2 text-lg">
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
    <div className="my-8">
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
