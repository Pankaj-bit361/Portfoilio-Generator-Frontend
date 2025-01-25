import React, { useEffect, useState } from "react";
import GlassLoader from "../components/GlassLoader";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Footer";
import PortfolioList from "../components/Protfolio/PortfolioList";
import General from "../config/general";
import { toast } from "react-toastify";

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      try {
        const data = await General.fetchPortfolios({ page: currentPage });
        if (data) {
          setPortfolios(data.portfolios);
          setTotalPages(data.pagination.totalPages);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (portfolio) => {
    navigate(`/generator/edit?portfolioId=${portfolio.portfolioId}`);
  };

  const handleView = (portfolio) => {
    const templateRoute = getTemplateRoute(portfolio.template);
    navigate(`${templateRoute}?portfolioId=${portfolio.portfolioId}`);
  };

  const handleDelete = async () => {
    try {
      const data = await General.fetchPortfolios({ page: currentPage });

      if (data && data.portfolios.length > 0) {
        setPortfolios(data.portfolios);
        setTotalPages(data.pagination.totalPages);
        toast.success("Portfolio deleted successfully");
      } else if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        toast.success("Portfolio deleted successfully");
      } else {
        setPortfolios([]);
        toast.success("Portfolio deleted successfully");
      }
    } catch (error) {
      console.error(
        "Error deleting portfolio:",
        error.response?.data || error.message
      );
      toast.error("Error deleting portfolio");
    }
  };
  const getTemplateRoute = (template) => {
    const templateRoutes = {
      modern: "/modern",
      creative: "/creative",
      professional: "/professional",
    };
    return templateRoutes[template.toLowerCase()] || "/modern";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1  transform-origin-0 z-50"
        style={{ scaleX }}
      />
      <Navbar />

      <div className="container mx-auto px-4 py-12 mt-10 lg:mt-0">
        {loading && <GlassLoader />}

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 md:mt-14 px-4 sm:px-6"
        >
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              My Portfolios
            </h1>
            <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">
              Manage and customize your professional portfolios
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl 
                   hover:opacity-90 transition-all duration-300 
                   shadow-lg shadow-purple-500/20 
                   bg-gradient-to-r from-blue-500 to-teal-500 
                   text-sm md:text-base"
            onClick={() => navigate("/generator/create")}
          >
            + Create New
          </motion.button>
        </motion.div>

        <PortfolioList
          portfolios={portfolios}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolios;
