import React from "react";
import PortfolioCard from "./PortfolioCard";
import Pagination from "./Pagination";

const PortfolioList = ({
  portfolios,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onView,
  onDelete,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.portfolioId}
            portfolio={portfolio}
            onEdit={onEdit}
            onView={onView}
            onDelete={onDelete}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PortfolioList;
