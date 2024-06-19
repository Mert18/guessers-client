import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomRichests = ({ rankedRiches }) => {
  return (
    <ul className="max-w-48 w-48 text-xs">
      {rankedRiches?.map((user, index) => (
        <li
          key={index}
          className="flex justify-between items-center my-2 w-full"
        >
          <div className="flex justify-start items-center">
            {index == 0 ? (
              <Image src="/money_green.svg" width={20} height={20} />
            ) : index == 1 ? (
              <Image src="/money_red.svg" width={20} height={20} />
            ) : (
              <Image src="/money_black.svg" width={20} height={20} />
            )}
            <p className="font-bold ml-2 underline">
              <Link href={`/profile/${user.username}`}>{user.username}</Link>
            </p>
          </div>
          <p className="font-bold text-secondary-darker">
            {user.balance.toFixed(2)}₺
          </p>
        </li>
      ))}
    </ul>
  );
};

export default RoomRichests;
