import Link from "next/link";

interface IRoomNameProps {
  roomName: string;
  roomId?: string;
}

const RoomName = ({ roomName, roomId }: IRoomNameProps) => {
  if (roomId) {
    return (
      <Link href={`/home/room/${roomId}/guess`} className="my-4 w-full">
        <h1 className="underline text-center bg-primary text-white font-bold p-2 cursor-pointer">
          {roomName}
        </h1>
      </Link>
    );
  } else {
    return (
      <h1 className="bg-primary border-2 border-primary rounded-md text-center text-white text-lg font-bold p-2 w-full">
        {roomName}
      </h1>
    );
  }
};

export default RoomName;
