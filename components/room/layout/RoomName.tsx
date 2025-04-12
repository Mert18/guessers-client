import Link from "next/link";

interface IRoomNameProps {
  roomName: string;
  roomId?: string;
}

const RoomName = ({ roomName, roomId }: IRoomNameProps) => {
  if (roomId) {
    return (
      <Link href={`/home/room/${roomId}/guess`} className="my-4">
        <h1 className="text-3xl underline bg-background-bright text-center text-primary font-bold p-2 cursor-pointer">
          {roomName}
        </h1>
      </Link>
    );
  } else {
    return (
      <h1 className="text-3xl bg-background-bright text-center text-primary font-bold my-4 p-2">
        {roomName}
      </h1>
    );
  }
};

export default RoomName;
