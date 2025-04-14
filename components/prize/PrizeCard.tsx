import CustomButton from "../common/CustomButton";
import { buyPrize } from "@/api/prize";
import { ColorEnum } from "@/enum/enum";
import { IPrize } from "@/types/IPrize.model";

interface IPrizeCardProps {
  prize: IPrize;
}

const PrizeCard = ({ prize }: IPrizeCardProps) => {
  const handleBuyPrize = (prizeId: string) => {
    buyPrize(prizeId);
  };
  return (
    <div className="inline-block mx-1">
      <div className="rounded-md bg-primary-dark w-48 h-48 p-2 text-white">
        <div>
          <p className="opacity-50">Prize Name</p>
          <p className="flex-1">{prize.name}</p>
        </div>
        <div>
          <p className="opacity-50">Description</p>
          <p className="flex-1">{prize.description}</p>
        </div>
        <div>
          <p className="opacity-50">Price</p>
          <p className="flex-1">{prize.value.toFixed(2)}</p>
        </div>
        <div className="flex-1">
          <CustomButton
            text="Buy"
            type="button"
            onClick={() => handleBuyPrize(prize.id)}
            color={ColorEnum.SUCCESS}
            bg={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PrizeCard;
