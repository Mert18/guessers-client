import React, { ReactNode } from "react";

interface ITableHeader {
  columns: ReactNode[];
}

const TableHeader = ({ columns }: ITableHeader) => {
  return (
    <div className="p-2 flex justify-start items-center font-bold text-primary-one border-b border-primary-one">
      {columns.map((column) => {
        return <p className="flex-1">{column}</p>;
      })}
    </div>
  );
};

export default TableHeader;
