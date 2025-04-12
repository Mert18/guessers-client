interface IComponentTitle {
  text: string;
  icon?: string;
}

const ComponentTitle = ({ text, icon }: IComponentTitle) => { // TODO: add icon feature
  return (
    <div className="flex justify-start items-center my-2">
      <h1 className="text-sm text-text uppercase my-2 font-bold underline">{text}</h1>
    </div>
  );
};

export default ComponentTitle;
