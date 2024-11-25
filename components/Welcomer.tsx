
interface IWelcomerProps {
  stats: any;
}

const Welcomer = ({ stats }: IWelcomerProps) => {
  return (
    <>
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="text-6xl py-4">guessers.io</h1>
        <p>Create a room, invite your friends and start guessing.</p>
      </div>
      <div className="flex justify-start items-center py-4 w-full">
        <p>
          <span className="text-text-default text-2xl font-bold">{stats.userCount}</span>{" "}
          Users,{" "}
          <span className="text-text-default text-2xl font-bold">{stats.roomCount}</span>{" "}
          Rooms,{" "}
          <span className="text-text-default text-2xl font-bold">{stats.eventCount}</span>{" "}
          Events
        </p>
      </div>
    </>
  );
};

export default Welcomer;
