"use client";
import { fetchRoomUsers, giveTokenToUsers } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import ComponentWithHeader from "@/components/common/ComponentWithHeader";
import CustomSelect from "@/components/form/CustomSelect";
import { t } from "i18next";
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
    });
  };

  const amountOptions = [
    { value: 100, label: "100" },
    { value: 200, label: "200" },
    { value: 500, label: "500" },
    { value: 1000, label: "1000" },
    { value: 5000, label: "5000" },
    { value: 10000, label: "10000" },
  ];

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
        <CustomSelect
          options={amountOptions}
          value={amount}
          onChange={(selectedOption) => setAmount(selectedOption.value)}
          placeholder={t("selectAmount")}
        />
      </ComponentWithHeader>

      <PrimaryButton text="Lend Token" onClick={() => handleLendToken()}  />
    </div>
  );
};

export default LendToken;
