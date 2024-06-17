import React from "react";
import RoomName from "./RoomName";
import RoomDescription from "./RoomDescription";
import ComponentWithHeader from "../common/ComponentWithHeader";
import RoomTopPredictors from "./RoomTopPredictors";
import RoomRichests from "./RoomRichests";

const RoomHeader = ({ room }) => {
  return (
    <div className="my-10 flex justify-evenly">
      <div className="">
        <ComponentWithHeader
          name="Room Name"
          children={<RoomName roomName={room.name} />}
        />
        <ComponentWithHeader
          name="Room Description"
          children={<RoomDescription roomDescription={room.description} />}
        />
      </div>

      <div>
        {room.userCorrectPredictions && (
          <ComponentWithHeader
            name="TOP PREDICTORS"
            children={
              <RoomTopPredictors
                userCorrectPredictions={room.userCorrectPredictions}
              />
            }
          />
        )}
      </div>

      <div>
        <ComponentWithHeader
          name="RICHESTS"
          children={<RoomRichests roomId={room.id} />}
        />
      </div>
    </div>
  );
};

export default RoomHeader;
