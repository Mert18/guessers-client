"use client";
import { fetchRoomUsers, getRoom, giveTokenToUsers } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import ComponentWithHeader from "@/components/common/ComponentWithHeader";
import Loader from "@/components/common/Loader";
import { IRoomBasic, IRoomUser } from "@/types/IRoom.model";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RoomName from "../RoomName";

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
    <div className="flex flex-col justify-center items-center text-text-default">
      <ComponentTitle text={"Lend Token"} />
      {room?.name && <RoomName roomName={room.name} roomId={params.roomId} />}

      <div className="w-full max-h-[300px] overflow-y-auto my-4 scrollbar-thin">
        <ComponentWithHeader name="Select Room Users">
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
                    ? "text-background-bright bg-primary-default"
                    : "bg-background-bright text-text-default"
                } flex justify-between items-center w-full p-2 my-1 rounded-md border-2 border-primary-default`}
              >
                <div>{roomUser.user.username}</div>
                <div>{roomUser.balance}</div>
              </button>
            ))}
          </div>
        </ComponentWithHeader>
      </div>

      <ComponentWithHeader name="Amount">
        <p>
          <span className="font-bold">{amount}</span>{" "}
          <button onClick={() => setAmount(amount + 50)}>+</button>{" "}
          <button
            onClick={() => {
              if (amount > 100) {
                setAmount(amount - 50);
              }
            }}
          >
            -
          </button>
        </p>
      </ComponentWithHeader>

      {loading ? (
        <Loader />
      ) : (
        <PrimaryButton
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
