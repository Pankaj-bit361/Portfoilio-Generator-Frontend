import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { ProjectCard } from "./ProjectCard";
import { AnimatedBackground } from "./AnimatedBackground";

export const Projects = ({ data }) => {
  return (
    <section id="projects" className="relative py-20">
      {/* <div className="absolute inset-0">
        <Canvas>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <ambientLight intensity={0.5} />
        </Canvas>
      </div> */}

      <AnimatedBackground />

      <div className="container relative mx-auto px-4 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
