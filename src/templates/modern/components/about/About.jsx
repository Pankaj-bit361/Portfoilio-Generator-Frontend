
import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Globe, Monitor } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const About = ({ data }) => {
  const { theme, getEffectClasses, getColorWithOpacity } = useTheme();

  console.log(theme)

  const skills = [
    {
      icon: <Code style={{ color: theme.primary }} className="w-8 h-8" />,
      title: "Languages",
      items: data.skills?.technical?.languages?.map((lang) => lang.name) || [],
    },
    {
      icon: <Database style={{ color: theme.primary }} className="w-8 h-8" />,
      title: "Frameworks",
      items: data.skills?.technical?.frameworks?.map((framework) => framework.name) || [],
    },
    {
      icon: <Globe style={{ color: theme.primary }} className="w-8 h-8" />,
      title: "Tools",
      items: data.skills?.technical?.tools?.map((tool) => tool.name) || [],
    },
    {
      icon: <Monitor style={{ color: theme.primary }} className="w-8 h-8" />,
      title: "Soft Skills",
      items: data.skills?.soft?.reduce((acc, category) => [...acc, ...category.skills], []) || [],
    },
  ];

  const SkillCard = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        backgroundColor: theme.glass ? 'rgba(255, 255, 255, 0.1)' : 'white',
        borderColor: getColorWithOpacity(theme.primary, 0.1),
      }}
      className={`
        relative rounded-3xl p-6
        shadow-sm hover:shadow-md transition-all duration-300
        ${getEffectClasses("card")}
      `}
    >
      <div
        style={{
          backgroundColor: theme.glass 
            ? 'rgba(255, 255, 255, 0.2)' 
            : getColorWithOpacity(theme.primary, 0.05),
          borderColor: getColorWithOpacity(theme.primary, 0.1),
        }}
        className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center border"
      >
        {skill.icon}
      </div>

      <h3 style={{ color: theme.text }} className="text-xl font-bold mb-4">
        {skill.title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {skill.items.map((item, idx) => (
          <span
            key={idx}
            style={{
              color: theme.primary,
              backgroundColor: getColorWithOpacity(theme.primary, 0.05),
              borderColor: getColorWithOpacity(theme.primary, 0.1),
            }}
            className="px-4 py-2 rounded-lg text-sm border transition-colors duration-300 hover:border-opacity-20"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section
      style={{
        background: `linear-gradient(to bottom right, ${theme.bgGradient})`,
      }}
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 space-y-16"
        >
          <div className="text-center space-y-4">
            <h2 style={{ color: theme.text }} className="text-4xl lg:text-5xl font-bold">
              About Me
            </h2>
            <div
              style={{ backgroundColor: theme.primary }}
              className="w-24 h-1 mx-auto rounded-full"
            />
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <h3 style={{ color: theme.text }} className="text-3xl font-bold leading-tight">
                {data.home?.profession}
                <span style={{ color: theme.primary }} className="block mt-2">
                  with {data.home?.yearsOfExperience}+ Years of Experience
                </span>
              </h3>

              <p style={{ color: theme.textLight }} className="text-lg leading-relaxed">
                {data.home?.summary}
              </p>

              <motion.a
                href={data.contact?.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  backgroundColor: theme.primary,
                  color: 'white',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primaryHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                }}
                className={`
                  inline-block px-8 py-4 rounded-xl
                  transition-all duration-300
                  shadow-sm hover:shadow-md
                  ${getEffectClasses("button")}
                `}
              >
                Download Resume
              </motion.a>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
