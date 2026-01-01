import ComponentTitle from "../common/ComponentTitle";
import GuessPaperCard from "../room/guesspaper/GuessPaperCard";
import Loader from "../common/Loader";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import { IPaging } from "@/types/IRequest.model";
import CustomButton from "../common/CustomButton";
import Image from "next/image";
import EmptyState from "../common/EmptyState";

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
      return (
        <EmptyState
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          title="No Guess Papers Yet"
          description="You haven't submitted any predictions yet. Join a room, find an active event, and make your first guess to start tracking your prediction accuracy!"
          actionText="Browse Rooms"
          actionLink="/home"
        />
      );
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
