import { IRoomUser } from "@/types/IRoom.model";
import Image from "next/image";
import Link from "next/link";
import TokenSymbol from "../../../common/TokenSymbol";

interface IRoomRichestsProps {
  rankedRiches: any; // TODO: fix it pls
}

const RoomRichests = ({ rankedRiches }: IRoomRichestsProps) => {
  return (
    <ul className="w-full text-black border border-primary rounded-md">
      {rankedRiches?.map((roomUser: IRoomUser, index: any) => (
        <li
          key={index}
          className={`p-2 flex items-center w-full justify-between gradient-white rounded-md`}
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
          <div className="flex items-center w-full justify-between">
            <p className="font-bold ml-2 underline">
              <Link href={`/home/profile/${roomUser.user.username}`}>
                {roomUser.user.username}
              </Link>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RoomRichests;
