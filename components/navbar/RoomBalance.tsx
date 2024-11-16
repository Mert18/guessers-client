import { IRoomUser } from "@/types/IRoom.model";
import Image from "next/image";

interface IRoomBalanceProps {
  roomUser: IRoomUser;
}

const RoomBalance = ({ roomUser }: IRoomBalanceProps) => {
  return (
    <div className="bg-failure text-text flex justify-evenly items-center h-full p-3 ml-2 rounded-md">
      <Image src="/balloon.svg" alt="balloon" width={15} height={15} className="mr-2" />
      <div>
        <p>{roomUser?.balance}</p>
      </div>
    </div>
  );
};

export default RoomBalance;
