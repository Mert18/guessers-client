import Link from "next/link";

interface IRoomNameProps {
  roomName: string;
  roomId?: string;
}

const RoomName = ({ roomName, roomId }: IRoomNameProps) => {
  if (roomId) {
    return (
      <Link href={`/home/room/${roomId}/guess`} className="my-4">
        <h1 className="underline bg-white-dark text-center text-primary font-bold p-2 cursor-pointer">
          {roomName}
        </h1>
      </Link>
    );
  } else {
    return (
      <h1 className="bg-primary border-2 border-primary rounded-md text-center text-white text-lg font-bold my-4 p-2">
        {roomName}
      </h1>
    );
  }
};

export default RoomName;
