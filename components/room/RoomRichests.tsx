import { IRoomUser } from "@/types/IRoom.model";
import Image from "next/image";
import Link from "next/link";

interface IRoomRichestsProps {
  rankedRiches: any; // TODO: fix it pls
}

const RoomRichests = ({ rankedRiches }: IRoomRichestsProps) => {
  return (
    <ul className="w-full text-xs">
      {rankedRiches?.map((roomUser: IRoomUser, index: any) => (
        <li
          key={index}
          className="flex justify-between items-center my-2 w-full"
        >
          <div className="flex justify-start items-center">
            {index == 0 ? (
              <Image src="/money_green.svg" alt="green money" width={20} height={20} />
            ) : index == 1 ? (
              <Image src="/money_red.svg" alt="red money" width={20} height={20} />
            ) : (
              <Image src="/money_black.svg" alt="black money" width={20} height={20} />
            )}
            <p className="font-bold ml-2 underline">
              <Link href={`/home/profile/${roomUser.user.username}`}>{roomUser.user.username}</Link>
            </p>
          </div>
          <p className="font-bold text-secondary-darker">
            {roomUser.balance.toFixed(2)}₺
          </p>
        </li>
      ))}
    </ul>
  );
};

export default RoomRichests;
