import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "../components/Home/Navbar";
import Hero3D from "../components/Home/Hero3D";
import Features from "../components/Home/Features";
import Footer from "../components/Footer";
import PortfolioTypes from "../components/Home/PortfolioTypes";

function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500 transform-origin-0 z-50"
        style={{ scaleX }}
      />
      <Navbar />
      <Hero3D />
      <Features />
      <PortfolioTypes />
      <Footer />
    </div>
  );
}

export default Home;
