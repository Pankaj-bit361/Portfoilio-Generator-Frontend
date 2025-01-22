import { motion } from "framer-motion";
import { FaCube, FaPalette, FaMagic } from "react-icons/fa";

const features = [
  {
    icon: FaCube,
    title: "3D Animations",
    description:
      "Add stunning 3D elements and animations to make your portfolio stand out.",
  },
  {
    icon: FaPalette,
    title: "Custom Themes",
    description:
      "Choose from a variety of themes or create your own unique design.",
  },
  {
    icon: FaMagic,
    title: "AI Generation",
    description: "Let our AI help you generate the perfect portfolio content.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-0 lg:py-24 bg-gradient-to-b from-black to-blue-900/20"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to create a professional portfolio that stands
            out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all"
            >
              <feature.icon className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
