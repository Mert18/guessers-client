
interface IWelcomerProps {
  stats: any;
}

const Welcomer = ({ stats }: IWelcomerProps) => {
  return (
    <div className="text-text-default">
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="text-3xl py-4 text-center w-full font-bold underline">guessers.io</h1>
        <p className="text-black">Create a room, invite your friends and start guessing.</p>
      </div>
      <div className="flex flex-col justify-start items-center py-4 w-full">
        <p className="flex flex-col justify-center items-center">
          <span className="text-text-default text-2xl font-bold">{stats.userCount}</span>
          <span className="text-black">Users</span>
        </p>

        <p className="flex flex-col justify-center items-center">
          <span className="text-text-default text-2xl font-bold">{stats.roomCount}</span>
          <span className="text-black">Rooms</span>
        </p>

        <p className="flex flex-col justify-center items-center">
          <span className="text-text-default text-2xl font-bold">{stats.eventCount}</span>
          <span className="text-black">Events</span>
        </p>
      </div>
    </div>
  );
};

export default Welcomer;
