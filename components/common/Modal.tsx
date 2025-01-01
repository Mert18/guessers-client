import PrimaryButton from "./button/PrimaryButton";

interface IModalProps {
  title: string;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, handleCloseModal, children }: IModalProps) => {
  return (
    <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="p-8 border-2 w-full lg:w-1/2 shadow-lg rounded-md bg-light-bg-sec dark:bg-dark-bg-sec dark:border dark:border-primary-one">
        <div className="text-center">
          <h3 className="text-xl font-bold text-text-default">{title}</h3>
          <div className="mt-2 px-3 py-3">{children}</div>
          <div className="flex justify-center mt-4">
            <PrimaryButton
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
