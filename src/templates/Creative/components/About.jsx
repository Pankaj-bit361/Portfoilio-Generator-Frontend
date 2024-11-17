import { motion } from "framer-motion";
import { Code2, Brain, Wrench } from "lucide-react";

export const About = ({ data }) => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-black to-purple-900"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto"
        >
          {data?.home?.summary}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-purple-800 bg-opacity-20 p-6 rounded-lg backdrop-blur-lg"
          >
            <div className="flex items-center mb-4">
              <Code2 className="text-purple-400 mr-2" size={24} />
              <h3 className="text-xl font-semibold text-white">Languages</h3>
            </div>
            <ul className="space-y-2">
              {data?.skills?.technical?.languages?.map((lang, index) => (
                <li key={index} className="text-gray-300">
                  {lang?.name} - {lang?.proficiency}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Frameworks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-purple-800 bg-opacity-20 p-6 rounded-lg backdrop-blur-lg"
          >
            <div className="flex items-center mb-4">
              <Brain className="text-purple-400 mr-2" size={24} />
              <h3 className="text-xl font-semibold text-white">Frameworks</h3>
            </div>
            <ul className="space-y-2">
              {data?.skills?.technical?.frameworks?.map((framework, index) => (
                <li key={index} className="text-gray-300">
                  {framework?.name} - {framework?.proficiency}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-purple-800 bg-opacity-20 p-6 rounded-lg backdrop-blur-lg"
          >
            <div className="flex items-center mb-4">
              <Wrench className="text-purple-400 mr-2" size={24} />
              <h3 className="text-xl font-semibold text-white">Tools</h3>
            </div>
            <ul className="space-y-2">
              {data?.skills?.technical?.tools?.map((tool, index) => (
                <li key={index} className="text-gray-300">
                  {tool?.name} - {tool?.proficiency}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
