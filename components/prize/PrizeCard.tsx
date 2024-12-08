import PrimaryButton from "../common/button/PrimaryButton";
import { buyPrize } from "@/api/prize";
import { IPrize } from "@/types/IPrize.model";

interface IPrizeCardProps {
  prize: IPrize;
}

const PrizeCard = ({ prize }: IPrizeCardProps) => {
  const handleBuyPrize = (prizeId: string) => {
    buyPrize(prizeId);
  };
  return (
    <div className="w-full text-text">
      <div className="flex justify-start items-center bg-background-bright my-1 text-primary-default border-2 border-primary-default transition-all px-2 py-3">
        <p className="flex-1">{prize.name}</p>
        <p className="flex-1">{prize.description}</p>
        <p className="flex-1">{prize.value.toFixed(2)}</p>
        <div className="flex-1">
          <PrimaryButton
            text="Buy"
            type="button"
            onClick={() => handleBuyPrize(prize.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default PrizeCard;
