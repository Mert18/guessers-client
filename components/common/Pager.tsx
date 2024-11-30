"use client";
import { IPaging } from "@/types/IRequest.model";
import React, { useEffect, useState } from "react";

interface IPagerProps {
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
}

const Pager = ({ paging, setPaging }: IPagerProps) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if(paging.totalPages === undefined) return;
    const generatedPages: any = []; // TODO: fix any
    for (let i = 1; i < paging.totalPages; i++) {
      generatedPages.push({ page: i + 1 });
    }
    setPages(generatedPages);
  }, [paging.totalPages]);
  
  return (
    <div className="py-2">
      <button
        onClick={() => {
          setPaging((prev) => ({ ...prev, page: 0 }));
        }}
        disabled={paging.page === 0}
        className={`${
          paging.page === 0
            ? "bg-primary-default text-background-bright hover:bg-primary-bright"
            : "text-primary-default bg-background-bright hover:bg-primary-default hover:text-background-bright"
        } font-bold rounded-md h-8 w-8 cursor-pointer transition-all border border-primary-default mr-1`}
      > 
        1
      </button>

      {pages.map((page: IPaging) => (
        <button
          key={page.page}
          onClick={() => {
            setPaging((prev) => ({ ...prev, page: page.page - 1 }));
          }}
          disabled={page.active}
          className={`${
            paging.page === page.page -1 ? "bg-primary-default text-background-bright hover:bg-primary-bright" : "text-primary-default bg-background-bright hover:bg-primary-default hover:text-background-bright"
          } font-bold rounded-md h-8 w-8 cursor-pointer transition-all border border-primary-default mr-1`}
        >
          {page.page}
        </button>
      ))}
    </div>
  );
};

export default Pager;