import React from "react";

const Pagination = ({ prevPage, nextPage }) => {
  return (
    <div className="pagination">
      <button className={prevPage ? "" : "disabled"} onClick={prevPage}>
        Prev
      </button>
      <button className={nextPage ? "" : "disabled"} onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
