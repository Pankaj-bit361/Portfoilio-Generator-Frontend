import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Experience = ({ data }) => {
  const { theme, getEffectClasses, convertTailwindToRgb, getColorWithOpacity } =
    useTheme();

  const TimelineCard = ({ item, isEducation, index, totalExperience }) => {
    const isEven = (index + (isEducation ? totalExperience : 0)) % 2 === 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: (index + (isEducation ? totalExperience : 0)) * 0.2,
        }}
        className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
          isEven ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Timeline Dot */}
        <div
          style={{
            backgroundColor: convertTailwindToRgb(
              isEducation ? theme.secondary : theme.primary
            ),
            borderColor: "#ffffff",
          }}
          className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full transform -translate-x-1/2 border-4"
        />

        {/* Content Card */}
        <div className="md:w-1/2 ml-8 md:ml-0">
          <motion.div
            whileHover={{ y: -5 }}
            style={{
              backgroundColor: "#ffffff",
              borderColor: getColorWithOpacity(
                convertTailwindToRgb(theme.accent),
                0.2
              ),
            }}
            className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3
                  style={{ color: convertTailwindToRgb(theme.text) }}
                  className="text-xl font-bold"
                >
                  {isEducation ? item.degree : item.role}
                </h3>
                <p
                  style={{ color: convertTailwindToRgb(theme.primary) }}
                  className="font-semibold"
                >
                  {isEducation ? item.school : item.company}
                </p>
              </div>
              <div
                style={{ color: convertTailwindToRgb(theme.textLight) }}
                className="flex items-center text-sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {item.startDate} - {item.endDate}
              </div>
            </div>

            {/* Location */}
            {item.location && (
              <div
                style={{ color: convertTailwindToRgb(theme.textLight) }}
                className="flex items-center mb-4"
              >
                <MapPin className="w-4 h-4 mr-2" />
                {item.location}
              </div>
            )}

            {/* Description */}
            <p
              style={{ color: convertTailwindToRgb(theme.textLight) }}
              className="mb-4"
            >
              {item.description}
            </p>

            {/* Responsibilities or Courses */}
            {!isEducation &&
              item.responsibilities &&
              item.responsibilities.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h4
                    style={{ color: convertTailwindToRgb(theme.text) }}
                    className="text-lg font-semibold mb-2"
                  >
                    Responsibilities:
                  </h4>
                  {item.responsibilities.map((responsibility, i) => (
                    <div key={i} className="flex items-start">
                      <ArrowRight
                        style={{ color: convertTailwindToRgb(theme.primary) }}
                        className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span
                        style={{ color: convertTailwindToRgb(theme.textLight) }}
                      >
                        {responsibility.description}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            {/* Achievements or Relevant Courses */}
            {!isEducation &&
            item.achievements &&
            item.achievements.length > 0 ? (
              <div className="space-y-2">
                <h4
                  style={{ color: convertTailwindToRgb(theme.text) }}
                  className="text-lg font-semibold mb-2"
                >
                  Achievements:
                </h4>
                {item.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start">
                    <ArrowRight
                      style={{ color: convertTailwindToRgb(theme.primary) }}
                      className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span
                      style={{ color: convertTailwindToRgb(theme.textLight) }}
                    >
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              isEducation &&
              item.relevantCourses &&
              item.relevantCourses.length > 0 && (
                <div className="space-y-2">
                  <h4
                    style={{ color: convertTailwindToRgb(theme.text) }}
                    className="text-lg font-semibold mb-2"
                  >
                    Relevant Courses:
                  </h4>
                  {item.relevantCourses.map((course, i) => (
                    <div key={i} className="flex items-start">
                      <Briefcase
                        style={{ color: convertTailwindToRgb(theme.secondary) }}
                        className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span
                        style={{ color: convertTailwindToRgb(theme.textLight) }}
                      >
                        {course}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      style={{
        background: `linear-gradient(to bottom right, ${theme.bgGradient})`,
      }}
      className="py-32"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2
            style={{ color: convertTailwindToRgb(theme.text) }}
            className="text-4xl lg:text-5xl font-bold"
          >
            Experience & Education
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ backgroundColor: convertTailwindToRgb(theme.primary) }}
            className="w-24 h-2 mx-auto rounded-full"
          />
          <p
            style={{ color: convertTailwindToRgb(theme.textLight) }}
            className="max-w-2xl mx-auto text-lg"
          >
            My professional and academic journey
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative space-y-8">
          {/* Timeline Line */}
          <div
            style={{
              backgroundColor: getColorWithOpacity(
                convertTailwindToRgb(theme.primary),
                0.2
              ),
            }}
            className="absolute left-0 md:left-1/2 h-full w-0.5 transform -translate-x-1/2"
          />

          {/* Experience Items */}
          {data.experience.map((exp, index) => (
            <TimelineCard
              key={`exp-${index}`}
              item={exp}
              index={index}
              isEducation={false}
              totalExperience={data.experience.length}
            />
          ))}

          {/* Education Items */}
          {data.education.map((edu, index) => (
            <TimelineCard
              key={`edu-${index}`}
              item={edu}
              index={index}
              isEducation={true}
              totalExperience={data.experience.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
