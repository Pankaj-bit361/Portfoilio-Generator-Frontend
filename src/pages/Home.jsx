import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaRocket,
  FaFileAlt,
  FaMagic,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaRocket />,
      title: "Quick Generation",
      description: "Create your portfolio in minutes with our AI-powered tool",
    },
    {
      icon: <FaFileAlt />,
      title: "PDF Import",
      description: "Import your resume directly from PDF format",
    },
    {
      icon: <FaMagic />,
      title: "Beautiful Design",
      description: "Professional and customizable portfolio templates",
    },
  ];

  const testimonials = [
    {
      name: "Alice Johnson",
      feedback:
        "This tool transformed my portfolio in no time! Highly recommend.",
      avatar:
        "https://static.wixstatic.com/media/85ed00_7f627dd8b34f45348baf5fb3f4f485ff~mv2.jpg/v1/fill/w_602,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_9731_edited.jpg",
    },
    {
      name: "Mark Smith",
      feedback:
        "The AI features are outstanding! I love how easy it is to use.",
      avatar:
        "https://media.licdn.com/dms/image/v2/D5603AQFrGZsfhnhTBg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1678240362955?e=2147483647&v=beta&t=nfOQ9jswVQ-DV0Bhu80-t5VSO4h3sRTEOMWNCtwsCQw",
    },
    {
      name: "Sara Lee",
      feedback:
        "Finally, a portfolio tool that looks professional and is easy to navigate.",
      avatar:
        "https://media.licdn.com/dms/image/v2/D4E03AQGbQhHfyf7JZA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1674240459123?e=2147483647&v=beta&t=drR2aJH4TFBmQ1ln-KtkCEgLcBGHuGB33q6UqaS4YCM",
    },
  ];

  return (
    <>
      <Navbar />
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="home"
        >
          {/* Hero Section */}
          <div className="home-hero">
            <motion.h1
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="home-title"
            >
              Create Your Dream Portfolio
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="home-description"
            >
              Transform your resume into a stunning portfolio website in
              minutes. Powered by AI for professional results.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/generator/create")}
              className="home-button"
            >
              Get Started Now
            </motion.button>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="home-features"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials Section */}
          <div className="home-testimonials">
            <h2 className="section-title" style={{ color : 'white'}}>What Our Users Say</h2>
            <motion.div className="testimonial-cards">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="testimonial-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <p className="testimonial-feedback">
                    "{testimonial.feedback}"
                  </p>
                  <p className="testimonial-name">- {testimonial.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
