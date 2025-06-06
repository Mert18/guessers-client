import { IRoomUser } from "@/types/IRoom.model";
import Image from "next/image";
import Link from "next/link";

const RoomTopPredictors = ({ rankedPredictions }: any) => {
  return (
    <ul className="w-full text-black border border-2 border-primary rounded-md">
      {rankedPredictions.length >= 1 &&
        rankedPredictions.map((roomUser: IRoomUser, index: any) => (
          <li
            key={roomUser.id}
            className={`p-2 flex items-center w-full justify-between gradient-white rounded-md`}
          >
            <div className="mr-1">
              {index == 0 ? (
                <Image
                  src="/trophy_green.svg"
                  alt="green colored trophy"
                  width={20}
                  height={20}
                />
              ) : index == 1 ? (
                <Image
                  src="/trophy_red.svg"
                  alt="red colored trophy"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/trophy_black.svg"
                  alt="black colored trophy"
                  width={20}
                  height={20}
                />
              )}
            </div>
            <div className="flex items-center w-full justify-between">
              <p className="font-bold p-2 underline">
                <Link href={`/home/profile/${roomUser.user.username}`}>
                  {roomUser.user.username}
                </Link>
              </p>
              <p className="font-bold text-background-bright">
                {roomUser.score}
              </p>
              </div>
          </li>
        ))}
    </ul>
  );
};

export default RoomTopPredictors;
