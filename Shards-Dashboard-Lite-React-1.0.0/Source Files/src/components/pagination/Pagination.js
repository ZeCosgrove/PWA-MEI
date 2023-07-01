import React from "react";

const Pagination = ({ onCounterChange, pagination }) => {
  const nextPage = () => {
    onCounterChange(1);
  };
  const previousPage = () => {
    onCounterChange(-1);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pagination.previous != null && (
          <li className="page-item">
            <button className="page-link" onClick={previousPage}>
              Anterior
            </button>
          </li>
        )}
        {pagination.previous != null && (
          <li className="page-item">
            <button className="page-link" onClick={previousPage}>
              {+pagination.page}
            </button>
          </li>
        )}
        <li className="page-item">
          <button className="page-link">
            <b>{+pagination.page + 1}</b>
          </button>
        </li>
        {pagination.next != null && (
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              {+pagination.page + 2}
            </button>
          </li>
        )}
        {pagination.next != null && (
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Próximo
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
