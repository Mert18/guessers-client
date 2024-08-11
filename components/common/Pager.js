"use client";
import React, { useEffect, useState } from "react";

const Pager = ({ paging, setPaging }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const generatedPages = [];
    for (let i = 1; i < paging.totalPages; i++) {
      generatedPages.push({ page: i + 1 });
    }
    setPages(generatedPages);
  }, [paging.totalPages]);
  
  return (
    <div>
      <button
        onClick={() => {
          setPaging((prev) => ({ ...prev, page: 0 }));
        }}
        disabled={paging.page === 0}
        className={`${
          paging.page === 0
            ? "underline text-primary"
            : "hover:underline text-text"
        } pr-2 py-2`}
      >
        1
      </button>

      {pages.map((page) => (
        <button
          key={page.page}
          onClick={() => {
            setPaging((prev) => ({ ...prev, page: page.page - 1 }));
          }}
          disabled={page.active}
          className={`${
            paging.page === page.page -1 ? "underline text-primary" : "hover:underline text-text"
          } px-4 py-2`}
        >
          {page.page}
        </button>
      ))}
    </div>
  );
};

export default Pager;
