import React from "react";

const BalanceWrapper = ({ balance }) => {
  return (
    <div className="flex items-center relative">
      <span className="font-bold absolute -top-4 left-0">BALANCE</span>

      <p className="mr-5 text-sm">
        <span className="font-bold">{balance?.toFixed(2)}₺</span>
      </p>
    </div>
  );
};

export default BalanceWrapper;
