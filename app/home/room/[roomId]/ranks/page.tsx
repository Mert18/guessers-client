import RoomRanksContent from "@/components/room/pages/ranks/RoomRanksContent";

interface IRoomRanksProps {
  params: {
    roomId: string;
  };
}

const RoomRanks = ({ params }: IRoomRanksProps) => {
  return <RoomRanksContent params={params} />;
};

export default RoomRanks;
