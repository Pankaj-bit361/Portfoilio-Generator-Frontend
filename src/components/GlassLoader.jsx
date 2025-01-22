import React from "react";
import "./glassLoader.css";

const GlassLoader = () => {
  return (
    <div className="glass-loader-overlay">
      <div className="loadingio-spinner-spinner">
        <div className="spinner-wrapper">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="spinner-line bg-gradient-to-r from-blue-500 to-teal-500"
              style={{
                transform: `rotate(${index * 30}deg)`,
                animationDelay: `${-0.0833333 * (12 - index)}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlassLoader;
