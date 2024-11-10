import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Experience = ({ data }) => {
  const { theme } = useTheme();

  return (
    <section className={`py-32 bg-gradient-to-br ${theme.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-bold text-${theme.text}`}>
            Experience & Education
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-24 h-2 bg-${theme.primary} mx-auto rounded-full`}
          />
          <p className={`text-${theme.textLight} max-w-2xl mx-auto text-lg`}>
            My professional and academic journey
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative space-y-8">
          {/* Timeline Line */}
          <div
            className={`absolute left-0 md:left-1/2 h-full w-0.5 bg-${theme.primary}/20 transform -translate-x-1/2`}
          />

          {/* Experience */}
          {data.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-0 md:left-1/2 w-5 h-5 bg-${theme.primary} rounded-full transform -translate-x-1/2 border-4 border-white`}
              />

              {/* Content Card */}
              <div className="md:w-1/2 ml-8 md:ml-0">
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-${theme.accent}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold text-${theme.text}`}>
                        {exp.role}
                      </h3>
                      <p className={`text-${theme.primary} font-semibold`}>
                        {exp.company}
                      </p>
                    </div>
                    <div
                      className={`flex items-center text-${theme.textLight} text-sm`}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>

                  {/* Location */}
                  {exp.location && (
                    <div
                      className={`flex items-center text-${theme.textLight} mb-4`}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {exp.location}
                    </div>
                  )}

                  {/* Description */}
                  <p className={`text-${theme.textLight} mb-4`}>
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h4
                        className={`text-lg font-semibold text-${theme.text} mb-2`}
                      >
                        Responsibilities:
                      </h4>
                      {exp.responsibilities.map((responsibility, i) => (
                        <div key={i} className="flex items-start">
                          <ArrowRight
                            className={`w-5 h-5 mr-2 text-${theme.primary} flex-shrink-0 mt-0.5`}
                          />
                          <span className={`text-${theme.textLight}`}>
                            {responsibility.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2">
                      <h4
                        className={`text-lg font-semibold text-${theme.text} mb-2`}
                      >
                        Achievements:
                      </h4>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start">
                          <ArrowRight
                            className={`w-5 h-5 mr-2 text-${theme.primary} flex-shrink-0 mt-0.5`}
                          />
                          <span className={`text-${theme.textLight}`}>
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Education */}
          {data.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: (index + data.experience.length) * 0.2,
              }}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
                (index + data.experience.length) % 2 === 0
                  ? "md:flex-row-reverse"
                  : ""
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-0 md:left-1/2 w-5 h-5 bg-${theme.secondary} rounded-full transform -translate-x-1/2 border-4 border-white`}
              />

              {/* Content Card */}
              <div className="md:w-1/2 ml-8 md:ml-0">
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-${theme.accent}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold text-${theme.text}`}>
                        {edu.degree}
                      </h3>
                      <p className={`text-${theme.primary} font-semibold`}>
                        {edu.school}
                      </p>
                    </div>
                    <div
                      className={`flex items-center text-${theme.textLight} text-sm`}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>

                  {/* Location */}
                  {edu.location && (
                    <div
                      className={`flex items-center text-${theme.textLight} mb-4`}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {edu.location}
                    </div>
                  )}

                  {/* Description */}
                  <p className={`text-${theme.textLight} mb-4`}>
                    {edu.description}
                  </p>

                  {/* Relevant Courses */}
                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h4
                        className={`text-lg font-semibold text-${theme.text} mb-2`}
                      >
                        Relevant Courses:
                      </h4>
                      {edu.relevantCourses.map((course, i) => (
                        <div key={i} className="flex items-start">
                          <Briefcase
                            className={`w-5 h-5 mr-2 text-${theme.secondary} flex-shrink-0 mt-0.5`}
                          />
                          <span className={`text-${theme.textLight}`}>
                            {course}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
