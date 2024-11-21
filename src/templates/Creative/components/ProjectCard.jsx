import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tilt } from 'react-tilt';

const images = [
  'https://documentation.bold-themes.com/medigreen/wp-content/uploads/sites/40/2019/02/menu-vertical-left.jpg',
  'https://documentation.bold-themes.com/medigreen/wp-content/uploads/sites/65/2024/04/new-import-02.png',
  'https://s3.envato.com/files/321758352/05_Cannabis_Preview.png',
];

const defaultTiltOptions = {
  max: 25,
  scale: 1.05,
  speed: 1000,
};

export const ProjectCard = ({ project, index }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Tilt options={defaultTiltOptions}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="bg-purple-800 bg-opacity-20 rounded-lg overflow-hidden backdrop-blur-lg transform-gpu"
      >
        <div className="relative h-48 overflow-hidden">
          <motion.div
            animate={{ x: `-${currentImage * 100}%` }}
            transition={{ type: "tween", duration: 0.5 }}
            className="absolute flex h-full"
          >
            {images.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt={`Project ${i + 1}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
          
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div> */}
        </div>

        <div className="p-6">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white mb-4"
          >
            {project.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mb-4"
          >
            {project.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {project.tools.map((tool, toolIndex) => (
              <span
                key={toolIndex}
                className="px-3 py-1 bg-purple-700 bg-opacity-40 rounded-full text-sm text-purple-200"
              >
                {tool}
              </span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex space-x-4"
          >
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors flex items-center gap-2 group"
            >
              <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Live Demo</span>
            </a>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors flex items-center gap-2 group"
            >
              <Github size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Source Code</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </Tilt>
  );
};