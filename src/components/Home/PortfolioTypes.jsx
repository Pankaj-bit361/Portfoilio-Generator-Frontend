import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

const RotatingCube = ({ position, color }) => (
  <Box args={[1, 1, 1]} position={position}>
    <meshStandardMaterial color={color} />
  </Box>
);

const PortfolioType = ({ title, description, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="relative h-[400px] bg-white/5 backdrop-blur-lg rounded-2xl p-8 overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-full h-48">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <RotatingCube position={[0, 0, 0]} color={color} />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
    <div className="relative z-10 mt-32">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
      {/* <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
      >
        View Examples
      </motion.button> */}
    </div>
  </motion.div>
);

const PortfolioTypes = () => {
  const types = [
    {
      title: "Modern Portfolio",
      description: "Sleek, minimalist designs with cutting-edge animations and interactive elements perfect for tech and digital professionals.",
      color: "#4299e1"
    },
    {
      title: "Creative Portfolio",
      description: "Bold, artistic layouts with unique interactions and eye-catching visuals ideal for designers and artists.",
      color: "#ed64a6"
    },
    {
      title: "Professional Portfolio",
      description: "Clean, sophisticated designs with a focus on content presentation perfect for executives and consultants.",
      color: "#48bb78"
    }
  ];

  return (
    <section id="templates" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Portfolio Types</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from three distinct styles, each crafted to showcase your unique professional identity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {types.map((type, index) => (
            <PortfolioType
              key={index}
              title={type.title}
              description={type.description}
              color={type.color}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioTypes;