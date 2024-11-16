import React from "react";

interface IComponentTitle {
  text: string;
  icon?: string;
}

const ComponentTitle = ({ text, icon }: IComponentTitle) => { // TODO: add icon feature
  return (
    <div className="flex justify-start items-center my-2">
      <h1 className="text-xs text-text uppercase my-2 font-bold">{text}</h1>
    </div>
  );
};

export default ComponentTitle;
