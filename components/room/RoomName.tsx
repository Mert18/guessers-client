
interface IRoomNameProps {
  roomName: string;
}

const RoomName = ({ roomName }: IRoomNameProps) => {
  return <h1 className="text-4xl">{roomName}</h1>;
};

export default RoomName;
