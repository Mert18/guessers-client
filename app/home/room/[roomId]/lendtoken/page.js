"use client";
import { fetchRoomUsers, giveTokenToUsers } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import ComponentWithHeader from "@/components/common/ComponentWithHeader";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LendToken = ({ params }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomUserIdsToLend, setRoomUserIdsToLend] = useState([]);
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  const getRoomUsers = () => {
    setLoading(true);
    const roomId = params.roomId;
    fetchRoomUsers(roomId)
      .then((response) => {
        setRoomUsers(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getRoomUsers();
  }, []);

  const handleLendToken = () => {
    setLoading(true);
    giveTokenToUsers(params.roomId, roomUserIdsToLend, amount).finally(() => {
        setLoading(false);
        router.push(`/home/room/${params.roomId}`);
    })
  }
  return (
    <div className="flex flex-col justify-center items-center text-text">
      <div>
        <ComponentTitle text="Lend Token" />
      </div>

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
                    ? "text-primary"
                    : "text-text"
                } flex justify-between items-center w-full`}
              >
                <div>{roomUser.user.username}</div>
                <div>{roomUser.balance}</div>
              </button>
            ))}
          </div>
        </ComponentWithHeader>
      </div>

      <ComponentWithHeader name="Amount">
        <select
          className="p-2 text-background"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        >
          <option key="100" value={100}>
            100₺
          </option>
          <option key="200" value={200}>
            200₺
          </option>
          <option key="500" value={500}>
            500₺
          </option>
          <option key="1000" value={1000}>
            1000₺
          </option>
          <option key="5000" value={5000}>
            5000₺
          </option>
          <option key="10000" value={10000}>
            10000₺
          </option>
        </select>
      </ComponentWithHeader>

      <PrimaryButton text="Lend Token" onClick={() => handleLendToken()} />
    </div>
  );
};

export default LendToken;
