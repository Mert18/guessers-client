"use client";
import ComponentTitle from "../../../common/ComponentTitle";
import Loader from "../../../common/Loader";
import PrizeCard from "../../../prize/PrizeCard";
import { IPrize } from "@/types/IPrize.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../../../common/table/Pager";
import TableEmptyInfo from "@/components/common/table/TableEmptyInfo";

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
  const prizesRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (prizes.length === 0) {
      return <TableEmptyInfo text="No prizes available." />;
    } else {
      return (
        <div className="w-full">
          <div className="bg-primary-default p-2 flex justify-start items-center text-background-bright font-bold border-2 border-primary-default">
            <h2 className="flex-1">{"Name"}</h2>
            <h2 className="flex-1">{"Description"}</h2>
            <h2 className="flex-1">{"Cost"}</h2>
            <h2 className="flex-1">{"Buy"}</h2>
          </div>
          {prizes.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} />
          ))}
          <Pager paging={paging} setPaging={setPaging} />
        </div>
      );
    }
  };

  return (
    <div className="my-8 text-xs">
      <ComponentTitle text={"prizes"} icon="/price-tag.svg" />
      {prizesRenderer()}
    </div>
  );
};

export default RoomActivePrizes;
