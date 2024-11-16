'use client'

interface IBalanceWrapperProps {
  balance: number;
}

const BalanceWrapper = ({ balance }: IBalanceWrapperProps) => {

  return (
    <div className="flex items-center relative">
      <span className="font-bold absolute -top-4 left-0">{"balance"}</span>

      <p className="mr-5 text-sm">
        <span className="font-bold">{balance?.toFixed(2)}₺</span>
      </p>
    </div>
  );
};

export default BalanceWrapper;
