import React from "react";

interface ITableWrapper {
  children: React.ReactNode;
}

const TableWrapper = ({ children }: ITableWrapper) => {
  return <div className="w-full bg-light-bg-sec dark:bg-dark-bg-sec dark:border dark:border-primary-one rounded-sm p-2 shadow-sm">
    {children}
  </div>;
};

export default TableWrapper;
