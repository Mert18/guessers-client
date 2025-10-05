import React from "react";

interface IGameWrapper {
  name: string;
  children: React.ReactNode;
}

const GameWrapper = ({ name, children }: IGameWrapper) => {
  return (
    <div className="overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="p-8 w-full">
        <div className="text-center">
          <h3 className="font-bold text-primary text-3xl py-8">{name}</h3>
          <div className="mt-2 px-3 py-3 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default GameWrapper;
