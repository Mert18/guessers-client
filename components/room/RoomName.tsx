import Link from "next/link";

interface IRoomNameProps {
  roomName: string;
  roomId?: string;
}

const RoomName = ({ roomName, roomId }: IRoomNameProps) => {
  if (roomId) {
    return (
      <Link href={`/home/room/${roomId}/guess`} className="my-4">
        <h1 className="text-xs bg-background-bright hover:bg-background-default transition-all text-center text-primary-default font-bold p-2 cursor-pointer border-2 border-primary-default">
          {roomName}
        </h1>
      </Link>
    );
  } else {
    return (
      <h1 className="text-xs bg-background-bright text-center text-primary-default border-2 border-primary-default font-bold my-4 p-2">
        {roomName}
      </h1>
    );
  }
};

export default RoomName;
