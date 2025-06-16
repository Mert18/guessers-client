
interface IWelcomerProps {
  stats: any;
}

const Welcomer = ({ stats }: IWelcomerProps) => {
  return (
    <div className="text-primary">
      <div className="flex flex-col justify-start items-start w-full">
        <p className="text-black">Create a room, invite your friends and start guessing.</p>
      </div>
      <div className="flex flex-col justify-start items-center py-4 w-full">
        <p className="flex flex-col justify-center items-center">
          <span className="text-primary font-bold">{stats.userCount}</span>
          <span className="text-black">Users</span>
        </p>

        <p className="flex flex-col justify-center items-center">
          <span className="text-primary font-bold">{stats.roomCount}</span>
          <span className="text-black">Rooms</span>
        </p>

        <p className="flex flex-col justify-center items-center">
          <span className="text-primary font-bold">{stats.eventCount}</span>
          <span className="text-black">Events</span>
        </p>
      </div>
    </div>
  );
};

export default Welcomer;
