import Link from "next/link";

interface IRoomNameProps {
  roomName: string;
  roomId?: string;
}

const RoomName = ({ roomName, roomId }: IRoomNameProps) => {
  if (roomId) {
    return (
      <Link href={`/home/room/${roomId}/guess`} className="w-full my-4">
        <h1 className="text-sm w-full bg-primary-default hover:bg-primary-bright transition-all text-center rounded-md text-background-bright font-bold p-2 cursor-pointer">
          {roomName}
        </h1>
      </Link>
    );
  } else {
    return (
      <h1 className="text-sm w-full bg-primary-default text-center rounded-md text-background-bright font-bold my-4 p-2">
        {roomName}
      </h1>
    );
  }
};

export default RoomName;
