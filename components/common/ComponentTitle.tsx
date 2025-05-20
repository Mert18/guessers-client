interface IComponentTitle {
  text: string;
  icon?: React.ReactNode;
}

const ComponentTitle = ({ text, icon }: IComponentTitle) => {
  return (
    <div className="flex justify-start items-center my-2">
      {icon && (
        <div className="flex justify-center items-center text-primary mr-2">
          {icon}
        </div>
      )}
      <h1 className="text-base text-text uppercase my-2 font-bold underline">{text}</h1>
    </div>
  );
};

export default ComponentTitle;
