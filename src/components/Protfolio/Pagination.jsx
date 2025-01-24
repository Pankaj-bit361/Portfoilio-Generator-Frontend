import React from "react";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (currentPage > 1) {
      pageNumbers.push(
        <motion.button
          key="prev_left"
          className="px-4 py-2 rounded-full transition-colors border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
          onClick={() => handlePageChange(1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {"<<"}
        </motion.button>
      );
      pageNumbers.push(
        <motion.button
          key="prev"
          className="px-4 py-2 rounded-full transition-colors border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
          onClick={handlePrevPage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {"<"}
        </motion.button>
      );
    }

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <motion.button
            key={i}
            className={`px-4 py-2 rounded-full transition-colors ${
              currentPage === i
                ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:opacity-90 text-white"
                : "border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
            }`}
            onClick={() => handlePageChange(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {i}
          </motion.button>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(
            <motion.button
              key={i}
              className={`px-4 py-2 rounded-full transition-colors ${
                currentPage === i
                  ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:opacity-90 text-white"
                  : "border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
              }`}
              onClick={() => handlePageChange(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {i}
            </motion.button>
          );
        }
        pageNumbers.push(
          <span key="ellipsis" className="px-4 py-2 text-gray-500">
            ...
          </span>
        );
        pageNumbers.push(
          <motion.button
            key={totalPages}
            className={`px-4 py-2 rounded-full transition-colors ${
              currentPage === totalPages
                ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:opacity-90 text-white"
                : "border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
            }`}
            onClick={() => handlePageChange(totalPages)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {totalPages}
          </motion.button>
        );
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(
          <motion.button
            key={1}
            className={`px-4 py-2 rounded-full transition-colors ${
              currentPage === 1
                ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:opacity-90 text-white"
                : "border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
            }`}
            onClick={() => handlePageChange(1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            1
          </motion.button>
        );
        pageNumbers.push(
          <span key="ellipsis1" className="px-4 py-2 text-gray-500">
            ...
          </span>
        );
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(
            <motion.button
              key={i}
              className={`px-4 py-2 rounded-full transition-colors ${
                currentPage === i
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
              }`}
              onClick={() => handlePageChange(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {i}
            </motion.button>
          );
        }
      } else {
        pageNumbers.push(
          <motion.button
            key={1}
            className="px-4 py-2 rounded-full transition-colors border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
            onClick={() => handlePageChange(1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            1
          </motion.button>
        );
        pageNumbers.push(
          <span key="ellipsis1" className="px-4 py-2 text-gray-500">
            ...
          </span>
        );
        pageNumbers.push(
          <motion.button
            key={currentPage - 1}
            className="px-4 py-2 rounded-full transition-colors border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
            onClick={() => handlePageChange(currentPage - 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentPage - 1}
          </motion.button>
        );
        pageNumbers.push(
          <motion.button
            key={currentPage}
            className="px-4 py-2 rounded-full transition-colors bg-blue-500 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
            onClick={() => handlePageChange(currentPage)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentPage}
          </motion.button>
        );
        pageNumbers.push(
          <motion.button
            key={currentPage + 1}
            className="px-4 py-2 rounded-full transition-colors border border-teal-700 text-teal-700 hover:text-white hover:bg-blue-600"
            onClick={() => handlePageChange(currentPage + 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentPage + 1}
          </motion.button>
        );
        pageNumbers.push(
          <span key="ellipsis2" className="px-4 py-2 text-gray-500">
            ...
          </span>
        );
        pageNumbers.push(
          <motion.button
            key={totalPages}
            className={`px-4 py-2 rounded-full transition-colors ${
              currentPage === totalPages
                ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:opacity-90 text-white "
                : "border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
            }`}
            onClick={() => handlePageChange(totalPages)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {totalPages}
          </motion.button>
        );
      }
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <motion.button
          key="next"
          className="px-4 py-2 rounded-full transition-colors border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
          onClick={handleNextPage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {">"}
        </motion.button>
      );
      pageNumbers.push(
        <motion.button
          key="next_right"
          className="px-4 py-2 rounded-full transition-colors border border-teal-700 text-teal-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500"
          onClick={() => handlePageChange(totalPages)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {">>"}
        </motion.button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-10 gap-3">{renderPageNumbers()}</div>
  );
};

export default Pagination;
