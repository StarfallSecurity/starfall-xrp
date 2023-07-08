import React from 'react';

function PaginationClassic({ pageSize, count, currentPage, fetchNextPage, fetchPreviousPage }) {
  const isFirstPage = currentPage === 1 ? true : false;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <a
              className={`btn  ${
                isFirstPage
                  ? 'bg-white border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'btn bg-white cursor-pointer border-slate-200 hover:border-slate-300 text-indigo-500'
              }`}
              disabled={isFirstPage}
              onClick={fetchPreviousPage}
            >
              &lt;- Previous
            </a>
          </li>
          <li className="ml-3 first:ml-0">
            <a
              onClick={fetchNextPage}
              className="btn bg-white cursor-pointer border-slate-200 hover:border-slate-300 text-indigo-500"
            >
              Next -&gt;
            </a>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600">{(currentPage - 1) * pageSize}</span>{' '}
        to <span className="font-medium text-slate-600">{currentPage * pageSize}</span> of{' '}
        <span className="font-medium text-slate-600">{count}</span> results
      </div>
    </div>
  );
}

export default PaginationClassic;
