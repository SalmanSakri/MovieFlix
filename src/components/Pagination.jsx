import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render if only one page exists
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${currentPage === 1
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-400 to-pink-400'
          } text-white`}
      >
        Prev
      </button>

      {/* Page Number Buttons */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-2 rounded ${currentPage === pageNumber
              ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold'
              : 'bg-gray-600 text-white hover:bg-gray-600'
              }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${currentPage === totalPages
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-400 to-pink-400'
          } text-white`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;