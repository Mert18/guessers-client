import CustomButton from "@/components/common/CustomButton";
import { ColorEnum, PickOneAndHopeObjectsEnum } from "@/enum/enum";
import React from "react";

interface IPickOneAndHopeIntro {
  handleJoinARoom: () => void;
  setSelectedObject: (object: PickOneAndHopeObjectsEnum) => void;
  selectedObject: PickOneAndHopeObjectsEnum;
  handleExitGame: () => void;
}

const PickOneAndHopeIntro = ({
  handleJoinARoom,
  setSelectedObject,
  selectedObject,
  handleExitGame,
}: IPickOneAndHopeIntro) => {
  return (
    <div className="flex flex-col justify-center items-center text-primary">
      <div>
        <p>1. Select one object.</p>
        <p>2. Search a room.</p>
        <p>3. Earn points as much as the object appears on the grid.</p>
        <p>
          4. You win the game if you have the most points after 5 grid changes.
        </p>
      </div>

      <div>
        <p className="text-center my-2">Select an object:</p>
        <div className="flex justify-center">
          {Object.values(PickOneAndHopeObjectsEnum).map((object) => (
            <button
              key={object}
              className={`w-16 h-16 m-2 rounded-full flex items-center justify-center cursor-pointer ${
                selectedObject === object
                  ? "bg-primary bg-opacity-50"
                  : "border-2 border-primary"
              }`}
              onClick={() => setSelectedObject(object)}
            >
              <img
                src={`/icons/games/pickoneandhope/${object}.svg`}
                alt={object}
                className="w-8 h-8"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="w-1/2 m-2">
        <CustomButton
          type="button"
          text="Search A Room"
          onClick={() => handleJoinARoom()}
          bg={true}
        />
        <p className="my-2"></p>
        <CustomButton
          type="button"
          text="Exit Game"
          onClick={() => handleExitGame()}
          bg={true}
          color={ColorEnum.FAILURE}
        />
      </div>
    </div>
  );
};

export default PickOneAndHopeIntro;
