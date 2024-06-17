import Image from "next/image";
import React from "react";

const RoomTopPredictors = ({ userCorrectPredictions }) => {
  return (
    <ul className="max-w-48 w-48 text-xs">
      {Object.entries(userCorrectPredictions)
        .splice(0, 3)
        .map(([key, value], index) => (
          <li key={index} className="flex justify-between items-center my-2 w-full">
            <div className="flex justify-start items-center">
              {index == 0 ? (
                <Image src="/trophy_green.svg" width={20} height={20} />
              ) : index == 1 ? (
                <Image src="/trophy_red.svg" width={20} height={20} />
              ) : (
                <Image src="/trophy_black.svg" width={20} height={20} />
              )}
              <p className="font-bold ml-2">
              {key}
              </p>
            </div>
            <p className="font-bold text-tertiary-darker">{value}</p>
          </li>
        ))}
    </ul>
  );
};

export default RoomTopPredictors;
