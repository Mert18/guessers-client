import React from "react";

const Pagination = ({ paging, setPaging }) => {
  return (
    <div className="text-text">
      <div>
        <button
          onClick={() => setPaging({ ...paging, page: paging.page - 1 })}
          disabled={paging.page === 0}
          className="mr-2 disabled:bg-slate-400 disabled:hover:cursor-default hover:bg-background3 cursor-pointer bg-background2 p-2 border border-background3 rounded-md hover:bg-background3"
        >
          Previous
        </button>
        <button
          onClick={() => setPaging({ ...paging, page: paging.page + 1 })}
          disabled={paging.page === paging.totalPages - 1}
          className="disabled:bg-slate-400 disabled:hover:cursor-default hover:bg-background3 cursor-pointer bg-background2 p-2 border border-background3 rounded-md hover:bg-background3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
