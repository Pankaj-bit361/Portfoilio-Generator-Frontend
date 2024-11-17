import { motion } from "framer-motion";
import { Code2, Brain, Wrench, Star } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";

const SkillCard = ({ icon: Icon, title, skills, index }) => {
  const cardVrts = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.5,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVrts}
      whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
      className="relative bg-purple-900/20 p-6 rounded-xl backdrop-blur-lg border border-purple-500/20 transform-gpu"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600/10 to-transparent" />
      <div className="relative">
        <motion.div
          className="flex items-center gap-3 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Icon className="text-purple-400" size={24} />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </motion.div>
        <div className="space-y-2">
          {skills.map((skill, skillIndex) => (
            <motion.div
              key={skillIndex}
              custom={skillIndex}
              variants={skillVariants}
              className="flex items-center gap-2 group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Star
                  className="text-purple-400 group-hover:text-purple-300"
                  size={16}
                />
              </motion.div>
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {typeof skill === "string"
                  ? skill
                  : `${skill.name} - ${skill.proficiency}`}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Skills = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="relative py-20 overflow-hidden min-h-screen"
    >
      <AnimatedBackground />

      <div className="container relative mx-auto px-4 z-10">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Skills & Expertise
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <SkillCard
            icon={Code2}
            title="Languages"
            skills={data.technical.languages}
            index={0}
          />
          <SkillCard
            icon={Brain}
            title="Frameworks"
            skills={data.technical.frameworks}
            index={1}
          />
          <SkillCard
            icon={Wrench}
            title="Tools"
            skills={data.technical.tools}
            index={2}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <motion.h3
            variants={titleVariants}
            className="text-2xl font-bold text-white mb-6 text-center"
          >
            Soft Skills
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.soft.map(
              (category, index) =>
                category.skills.length > 0 && (
                  <motion.div
                    key={index}
                    variants={cardVrts}
                    custom={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-purple-900/20 p-6 rounded-xl backdrop-blur-lg border border-purple-500/20"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">
                      {category.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          variants={skillVariants}
                          custom={skillIndex}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-purple-700/40 rounded-full text-sm text-purple-200 hover:bg-purple-600/40 transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
