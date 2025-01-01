import React from "react";

interface ITableCardWrapper {
  children: React.ReactNode;
  changeBgOnHover: boolean;
}

const TableCardWrapper = ({ children, changeBgOnHover = true }: ITableCardWrapper) => {
  return (
    <div className={`flex justify-start font-bold items-center my-1 text-light-text dark:text-dark-text ${changeBgOnHover ? "hover:bg-primary-one hover:text-dark-text": ""} transition-all px-2 py-3 rounded-sm w-full`}>
      {children}
    </div>
  );
};

export default TableCardWrapper;
