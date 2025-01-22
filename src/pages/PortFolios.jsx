import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/api";
import GlassLoader from "../components/GlassLoader";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { Edit2, Eye, Lock, Globe, Calendar, Code, Plus } from "lucide-react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Footer";
import { Tilt } from "react-tilt";
const defaultTiltOptions = {
  max: 25,
  scale: 1.05,
  speed: 1000,
};
const PortFolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
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
        let data = JSON.parse(localStorage.getItem("portfolioUser"));
        const response = await axios.get(
          `${config.BASE_URL}api/portfolio?userId=${data.userId}`
        );
        if (response.data.success) {
          setPortfolios(response.data.data.portfolios);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-teal-500",
      inactive: "bg-blue-500",
      draft: "bg-teal-500",
    };
    return colors[status.toLowerCase()] || "bg-blue-500";
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
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">My Portfolios</h1>
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
        <Plus size={16} className="md:w-5 md:h-5" />
        Create New
      </motion.button>
    </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((portfolio, index) => (
            <Tilt options={defaultTiltOptions}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="from-black via-blue-900 to-black bg-[radial-gradient(circle_at_100%_120%,rgba(66,153,225,0.1),transparent)] bg-opacity-20 rounded-lg overflow-hidden backdrop-blur-lg transform-gpu p-6 transition-all duration-300 hover:shadow-[0_4px_15px_0_rgba(56,189,248,0.8)]  shadow-teal-500/20 border-teal-500/20 border-2"
              >
                <div className="flex justify-between items-center mb-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                      portfolio.status
                    )}`}
                  >
                    {portfolio.status}
                  </span>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/5 hover:bg-teal-500/10"
                      onClick={() =>
                        window.open(
                          `/creative?portfolioId=${portfolio.portfolioId})`,
                          "_blank"
                        )
                      }
                    >
                      <Eye size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/5 hover:bg-teal/10 transition-colors"
                      onClick={() =>
                        navigate(
                          `/generator/edit?portfolioId=${portfolio.portfolioId}`
                        )
                      }
                    >
                      <Edit2 size={18} />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      {portfolio.home.name}
                    </h2>
                    <p className="text-gray-400">{portfolio.home.profession}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Code size={18} className="text-blue-400" />
                      <span className="text-sm">
                        Template: {portfolio.template}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar size={18} className="text-blue-400" />
                      <span className="text-sm">
                        Created: {formatDate(portfolio.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      {portfolio.visibility === "public" ? (
                        <Globe size={18} className="text-blue-400" />
                      ) : (
                        <Lock size={18} className="text-blue-500" />
                      )}
                      <span className="text-sm">
                        {portfolio.visibility.charAt(0).toUpperCase() +
                          portfolio.visibility.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-xs">
                        ID
                      </div>
                      <span className="text-sm font-mono">
                        {portfolio.portfolioId.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortFolios;
