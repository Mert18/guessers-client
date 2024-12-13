import { IRoomUser } from "@/types/IRoom.model";
import Image from "next/image";
import Link from "next/link";
import TokenSymbol from "../../../common/TokenSymbol";

interface IRoomRichestsProps {
  rankedRiches: any; // TODO: fix it pls
}

const RoomRichests = ({ rankedRiches }: IRoomRichestsProps) => {
  return (
    <ul className="w-full text-xs">
      {rankedRiches?.map((roomUser: IRoomUser, index: any) => (
        <li
          key={index}
          className={`p-2 flex items-center w-full justify-between ${
            index == 0
              ? "bg-text-default"
              : index == 1
              ? "bg-primary-default"
              : "bg-primary-bright"
          } my-1`}
        >
          <div className="mr-1">
            {index == 0 ? (
              <Image
                src="/money_green.svg"
                alt="green money"
                width={20}
                height={20}
              />
            ) : index == 1 ? (
              <Image
                src="/money_red.svg"
                alt="red money"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/money_black.svg"
                alt="black money"
                width={20}
                height={20}
              />
            )}
          </div>
          <div className="flex items-center w-full justify-between text-background-bright">
            <p className="font-bold ml-2 underline">
              <Link href={`/home/profile/${roomUser.user.username}`}>
                {roomUser.user.username}
              </Link>
            </p>
            <p className="font-bold text-background-bright flex justify-center items-center">
              {roomUser.balance.toFixed(2)} <TokenSymbol />
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RoomRichests;
