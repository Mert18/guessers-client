import CustomButton from "@/components/common/CustomButton";
import { ColorEnum, PickOneAndHopeObjectsEnum } from "@/enum/enum";
import React from "react";

interface IPickOneAndHopeSearchingRoom {
  selectedObject: PickOneAndHopeObjectsEnum;
  handleStopSearching: () => void;
}

const PickOneAndHopeSearchingRoom = ({
  selectedObject,
  handleStopSearching,
}: IPickOneAndHopeSearchingRoom) => {
  return (
    <div className="flex flex-col justify-center items-center text-lg">
      <img
        src={`/icons/games/pickoneandhope/${selectedObject}.svg`}
        alt={selectedObject}
        className="w-12 h-12"
      />
      <p className="my-4">Searching Room...</p>

      <div className="w-1/2 m-2">
        <CustomButton
          type="button"
          text="Stop Searching"
          color={ColorEnum.FAILURE}
          onClick={() => handleStopSearching()}
          bg={true}
        />
      </div>
    </div>
  );
};

export default PickOneAndHopeSearchingRoom;
