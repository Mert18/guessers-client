interface IPrimaryOneButton {
  type: "submit" | "button";
  onClick?: () => void;
  text: string;
  one?: boolean;
}

const PrimaryOneButton = ({ type, onClick, text, one = true }: IPrimaryOneButton) => {
  return (
    <button
      className={`${one ? "bg-primary-one hover:bg-primary-one-hover" : "bg-primary-two hover:bg-primary-two-hover"} text-dark-text p-2 transition-all text-xs flex-1 font-bold my-1 rounded-md`}
      type={type}
      onClick={onClick}
    >
      <p>{text}</p>
    </button>
  );
};

export default PrimaryOneButton;
