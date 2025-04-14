import CustomButton from "./CustomButton";

interface IModalProps {
  title: string;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, handleCloseModal, children }: IModalProps) => {
  return (
    <div className="fixed inset-0 bg-primary-dark bg-opacity-70 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="p-8 border-2 border-primary w-full lg:w-1/2 shadow-lg rounded-md bg-white-bright">
        <div className="text-center">
          <h3 className="text-xl font-bold text-text">{title}</h3>
          <div className="mt-2 px-3 py-3">{children}</div>
          <div className="flex justify-center mt-4">
            <CustomButton
              type="button"
              text="Close"
              onClick={() => handleCloseModal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
