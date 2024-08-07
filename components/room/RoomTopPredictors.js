import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomTopPredictors = ({ rankedPredictions }) => {
  return (
    <ul className="max-w-48 w-48 text-xs">
      {rankedPredictions.length >= 1 && rankedPredictions.map((roomUser, index) => (
        <li
          key={roomUser.id}
          className="flex justify-between items-center my-2 w-full"
        >
          <div className="flex justify-start items-center">
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
            <p className="font-bold ml-2 underline">
              <Link href={`/home/profile/${roomUser.user.username}`}>{roomUser.user.username}</Link>
            </p>
          </div>
          <p className="font-bold text-secondary-darker">{roomUser.score}</p>
        </li>
      ))}
    </ul>
  );
};

export default RoomTopPredictors;
