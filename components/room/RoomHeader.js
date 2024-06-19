import React from "react";
import RoomName from "./RoomName";
import RoomDescription from "./RoomDescription";
import ComponentWithHeader from "../common/ComponentWithHeader";
import RoomTopPredictors from "./RoomTopPredictors";
import RoomRichests from "./RoomRichests";
import Link from "next/link";

const RoomHeader = ({ room, rankedRiches, owner }) => {
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

        {owner && (
          <div className="text-xs">
            <Link
              href={`/room/${room.id}/event/create`}
              className="p-2 mr-2 bg-primary text-background font-bold hover:bg-primary-brighter"
            >
              Create Event
            </Link>
            <Link
              href={`/room/${room.id}/invite`}
              className="p-2 bg-primary text-background font-bold hover:bg-primary-brighter"
            >
              Invite People
            </Link>
          </div>
        )}
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
          children={<RoomRichests rankedRiches={rankedRiches} />}
        />
      </div>
    </div>
  );
};

export default RoomHeader;
