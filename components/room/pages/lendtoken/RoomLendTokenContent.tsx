"use client";
import { fetchRoomUsers, getRoom, giveTokenToUsers } from "@/api/room";
import CustomButton from "@/components/common/CustomButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import { IRoomBasic, IRoomUser } from "@/types/IRoom.model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RoomName from "../../layout/RoomName";

interface IRoomLendTokenContentProps {
  params: {
    roomId: string;
  };
}

const RoomLendTokenContent = ({ params }: IRoomLendTokenContentProps) => {
  const [room, setRoom] = useState<IRoomBasic>();
  const [roomUsers, setRoomUsers] = useState<IRoomUser[]>([]);
  const [roomUserIdsToLend, setRoomUserIdsToLend] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(100);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getRoomUsers = () => {
    const roomId = params.roomId;
    fetchRoomUsers(roomId).then((response) => {
      setRoomUsers(response.data);
    });
  };
  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });
  }, [params.roomId]);

  useEffect(() => {
    getRoomUsers();
  }, []);

  const handleLendToken = () => {
    if (roomUserIdsToLend.length === 0) {
      toast.error("Please select at least one user to lend token.");
      return;
    }
    setLoading(true);
    giveTokenToUsers({
      roomId: params.roomId,
      roomUserIds: roomUserIdsToLend,
      amount,
    })
      .then(() => {
        router.push(`/home/room/${params.roomId}/guess`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center text-text">
      <ComponentTitle text={"Lend Token"} />
      {room?.name && <RoomName roomName={room.name} roomId={params.roomId} />}

      <div className="w-full overflow-y-auto my-4 scrollbar-thin">
        <ComponentTitle text="Select Room Users" />
        <div className="w-full my-2">
          {roomUsers.map((roomUser) => (
            <button
              onClick={() => {
                if (roomUserIdsToLend.includes(roomUser.id)) {
                  setRoomUserIdsToLend(
                    roomUserIdsToLend.filter((id) => id !== roomUser.id)
                  );
                } else {
                  setRoomUserIdsToLend([...roomUserIdsToLend, roomUser.id]);
                }
              }}
              key={roomUser.id}
              className={`${
                roomUserIdsToLend.includes(roomUser.id)
                  ? "text-white gradient-primary"
                  : "gradient-white text-primary"
              } flex justify-between items-center w-full p-2 my-1 rounded-md border-2 border-primary`}
            >
              <div>{roomUser.user.username}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="my-4 w-full flex justify-between items-center">
        <ComponentTitle text="Amount" />
        <select
          defaultValue={50}
          className="p-2 rounded-md text-black"
          onChange={(e) => setAmount(Number(e.target.value))}
        >
          <option>50</option>
          <option>100</option>
          <option>200</option>
          <option>500</option>
          <option>1000</option>
          <option>10000</option>
          <option>50000</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <CustomButton
          type="submit"
          text="Lend Token"
          onClick={() => handleLendToken()}
          bg
        />
      )}
    </div>
  );
};

export default RoomLendTokenContent;
