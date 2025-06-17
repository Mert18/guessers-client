interface IComponentTitle {
  text: string;
  icon?: React.ReactNode;
}

const ComponentTitle = ({ text, icon }: IComponentTitle) => {
  return (
    <div className="flex w-max py-1 rounded-md">
      {icon && (
        <div className="flex justify-center items-center text-primary mr-2">
          {icon}
        </div>
      )}
      <h1 className="uppercase my-2 font-bold underline">{text}</h1>
    </div>
  );
};

export default ComponentTitle;
