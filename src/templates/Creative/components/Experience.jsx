import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { GraduationCap, Briefcase } from "lucide-react";

export const Experience = ({ data }) => {
  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-b from-purple-900 to-black"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Experience & Education
        </motion.h2>

        <VerticalTimeline lineColor="#9333ea">
          {/* Education Timeline */}
          {data.education.map((edu, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--education"
              contentStyle={{
                background: "rgba(147, 51, 234, 0.2)",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
              contentArrowStyle={{
                borderRight: "7px solid rgba(147, 51, 234, 0.2)",
              }}
              date={`${edu.startDate} - ${edu.endDate}`}
              iconStyle={{ background: "#9333ea", color: "#fff" }}
              icon={<GraduationCap />}
            >
              <h3 className="vertical-timeline-element-title text-xl font-bold">
                {edu.degree}
              </h3>
              <h4 className="vertical-timeline-element-subtitle text-purple-300 mt-2">
                {edu.school}
              </h4>
            </VerticalTimelineElement>
          ))}

          {/* Work Experience Timeline */}
          {data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <VerticalTimelineElement
                key={`exp-${index}`}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "rgba(147, 51, 234, 0.2)",
                  color: "#fff",
                  backdropFilter: "blur(10px)",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid rgba(147, 51, 234, 0.2)",
                }}
                date={`${exp.startDate} - ${exp.endDate}`}
                iconStyle={{ background: "#4f46e5", color: "#fff" }}
                icon={<Briefcase />}
              >
                <h3 className="vertical-timeline-element-title text-xl font-bold">
                  {exp.role}
                </h3>
                <h4 className="vertical-timeline-element-subtitle text-purple-300 mt-2">
                  {exp.company}
                </h4>
              </VerticalTimelineElement>
            ))
          ) : (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "rgba(147, 51, 234, 0.2)",
                color: "#fff",
                backdropFilter: "blur(10px)",
              }}
              contentArrowStyle={{
                borderRight: "7px solid rgba(147, 51, 234, 0.2)",
              }}
              iconStyle={{ background: "#4f46e5", color: "#fff" }}
              icon={<Briefcase />}
            >
              <h3 className="vertical-timeline-element-title text-xl font-bold">
                Building Experience
              </h3>
              <p className="mt-2">
                Currently focusing on projects and skill development
              </p>
            </VerticalTimelineElement>
          )}
        </VerticalTimeline>
      </div>
    </section>
  );
};
