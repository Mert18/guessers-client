
interface IRoomNameProps {
  roomName: string;
}

const RoomName = ({ roomName }: IRoomNameProps) => {
  return <h1 className="text-sm w-full bg-primary-default text-center rounded-md text-background-bright font-bold my-4 p-2">{roomName}</h1>;
};

export default RoomName;
