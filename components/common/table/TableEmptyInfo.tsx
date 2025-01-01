import React from "react";

interface ITableEmptyInfo {
  text: string;
}

const TableEmptyInfo = ({ text }: ITableEmptyInfo) => {
  return <p className="text-light-text dark:text-dark-text py-2">{text}</p>;
};

export default TableEmptyInfo;
