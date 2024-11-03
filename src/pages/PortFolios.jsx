import React, { useEffect, useState } from "react";
import "../styles/components/portfolio.css";
import axios from "axios";
import { config } from "../config/api";
import GlassLoader from "../components/GlassLoader";
import { useNavigate } from "react-router-dom";

const PortFolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <div className="portfolio-container">
      {loading && <GlassLoader />}
      <header className="portfolio-header">
        <h1>My Portfolios</h1>
      </header>

      <div className="portfolio-grid">
        {portfolios.map((portfolio) => (
          <div key={portfolio._id} className="portfolio-card">
            <div className="card-header">
              <div className="status-badge">{portfolio.status}</div>
              <button className="edit-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>

            <div className="card-content">
              <h2>{portfolio.home.name}</h2>
              <p className="profession">{portfolio.home.profession}</p>

              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Template:</span>
                  <span className="value">{portfolio.template}</span>
                </div>
                <div className="info-item">
                  <span className="label">Created:</span>
                  <span className="value">
                    {formatDate(portfolio.createdAt)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Visibility:</span>
                  <span className="value">{portfolio.visibility}</span>
                </div>
                <div className="info-item">
                  <span className="label">ID:</span>
                  <span className="value">
                    {portfolio.portfolioId.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button
                className="portfolio-btn"
                onClick={() =>
                  navigate(
                    `/generator/edit?portfolioId=${portfolio.portfolioId}`
                  )
                }
              >
                View Portfolio
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortFolios;
