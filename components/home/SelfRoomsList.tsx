import ComponentTitle from "../common/ComponentTitle";
import SelfRoomCard from "./SelfRoomCard";
import Pager from "../common/table/Pager";
import Loader from "../common/Loader";
import { IRoomUser } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";
import TableHeader from "../common/table/TableHeader";
import TableEmptyInfo from "../common/table/TableEmptyInfo";
import TableWrapper from "../common/table/TableWrapper";

interface ISelfRoomsListProps {
  selfRooms: IRoomUser[];
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
  loading: boolean;
}

const SelfRoomsList = ({
  selfRooms,
  paging,
  setPaging,
  loading,
}: ISelfRoomsListProps) => {
  const selfRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <TableWrapper>
          <TableHeader columns={["Room Name", "Owner", "Members"]} />
          {selfRooms?.length === 0 ? (
            <TableEmptyInfo text="You have not attended any rooms." />
          ) : (
            <>
              {selfRooms?.map((room) => (
                <SelfRoomCard key={room.id} roomUser={room} />
              ))}
              <Pager paging={paging} setPaging={setPaging} />
            </>
          )}
        </TableWrapper>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text="Your rooms" icon="/door.svg" />
      {selfRoomsListRenderer()}
    </div>
  );
};

export default SelfRoomsList;
