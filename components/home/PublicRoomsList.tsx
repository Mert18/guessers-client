import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { IRoomBasic } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../common/table/Pager";
import TableHeader from "../common/table/TableHeader";
import TableEmptyInfo from "../common/table/TableEmptyInfo";
import TableWrapper from "../common/table/TableWrapper";

interface IPublicRoomsListProps {
  publicRooms: IRoomBasic[];
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
  loading: boolean;
}

const PublicRoomsList = ({
  publicRooms,
  paging,
  setPaging,
  loading,
}: IPublicRoomsListProps) => {
  const publicRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else {
      return (
        <TableWrapper>
          <TableHeader columns={["Room Name", "Owner", "Members", "Join"]} />
          {publicRooms?.length === 0 ? (
            <TableEmptyInfo text="No public rooms available." />
          ) : (
            <>
              {publicRooms?.map((room) => (
                <PublicRoomCard key={room.id} room={room} />
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
      <ComponentTitle text="Public rooms" icon="door-open.svg" />
      {publicRoomsListRenderer()}
    </div>
  );
};

export default PublicRoomsList;
