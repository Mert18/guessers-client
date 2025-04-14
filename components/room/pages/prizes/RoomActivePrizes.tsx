"use client";
import ComponentTitle from "../../../common/ComponentTitle";
import Loader from "../../../common/Loader";
import PrizeCard from "../../../prize/PrizeCard";
import { IPrize } from "@/types/IPrize.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../../../common/Pager";
import CustomButton from "@/components/common/CustomButton";

interface IRoomActivePrizesProps {
  prizes: IPrize[];
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
  loading: boolean;
}

const RoomActivePrizes = ({
  prizes,
  paging,
  setPaging,
  loading,
}: IRoomActivePrizesProps) => {
  const handleLoadMorePrizes = () => {
    setPaging((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const prizesRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (prizes.length === 0) {
      return <p>No prizes available.</p>;
    } else {
      return (
        <div className="flex flex-nowrap max-w-full overflow-x-auto py-2">
          {prizes.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} />
          ))}
          {paging.totalElements !== prizes.length && (
            <div className="w-48">
              <CustomButton
                onClick={() => handleLoadMorePrizes()}
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
    <div className="my-8 text-sm">
      <ComponentTitle text={"prizes"} icon="/price-tag.svg" />
      {prizesRenderer()}
    </div>
  );
};

export default RoomActivePrizes;
