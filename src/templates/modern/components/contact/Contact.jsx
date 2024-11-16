import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  Earth,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Contact = ({ data }) => {
  const { theme } = useTheme();

  console.log(data);

  const socialLinks = [
    data.socialMedia?.github && {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      url: data.socialMedia.github,
    },
    data.socialMedia?.linkedin && {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: data.socialMedia.linkedin,
    },
    data.socialMedia?.twitter && {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      url: data.socialMedia.twitter,
    },

    data.socialMedia?.website && {
      name: "Website",
      icon: <Earth className="w-6 h-6" />,
      url: data.socialMedia?.website,
    },
  ].filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={`py-32 bg-gradient-to-br ${theme.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-bold text-${theme.text}`}>
            Contact Me
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-24 h-2 bg-${theme.primary} mx-auto rounded-full`}
          />
          <p className={`text-${theme.textLight} max-w-2xl mx-auto text-lg`}>
            Let's discuss your project and bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className={`text-2xl font-semibold text-${theme.text}`}>
                Get in Touch
              </h3>
              <p className={`text-${theme.textLight} leading-relaxed`}>
                I'm currently available for freelance work and full-time
                positions. Feel free to reach out if you have any questions or
                would like to collaborate.
              </p>
            </div>

            <div className="space-y-6">
              {[
                data.email && {
                  icon: <Mail className="w-6 h-6" />,
                  label: "Email",
                  value: data.email,
                  link: `mailto:${data.email}`,
                },
                data.phone && {
                  icon: <Phone className="w-6 h-6" />,
                  label: "Phone",
                  value: data.phone,
                  link: `tel:${data.phone}`,
                },
                data.location && {
                  icon: <MapPin className="w-6 h-6" />,
                  label: "Location",
                  value: data.location,
                },
              ]
                .filter(Boolean)
                .map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-${theme.accent} rounded-xl flex items-center justify-center text-${theme.primary}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className={`text-sm text-${theme.textLight}`}>
                        {item.label}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className={`text-${theme.text} font-medium hover:text-${theme.primary} transition-colors`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className={`text-${theme.text} font-medium`}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {socialLinks.length > 0 && (
              <div className="space-y-4">
                <h4 className={`text-${theme.text} font-medium`}>Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-${theme.accent} rounded-xl text-${theme.textLight} hover:text-${theme.primary} transition-colors duration-300`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {["name", "email"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className={`block text-sm font-medium text-${theme.textLight} mb-2 capitalize`}
                    >
                      {field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      name={field}
                      className={`w-full px-4 py-3 bg-${theme.accent} border border-${theme.accent} rounded-xl focus:outline-none focus:ring-2 focus:ring-${theme.primary} focus:bg-white transition-all duration-200`}
                      placeholder={
                        field === "name" ? "Name" : "name@example.com"
                      }
                      required
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium text-${theme.textLight} mb-2`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={`w-full px-4 py-3 bg-${theme.accent} border border-${theme.accent} rounded-xl focus:outline-none focus:ring-2 focus:ring-${theme.primary} focus:bg-white transition-all duration-200`}
                  placeholder="Project Inquiry"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium text-${theme.textLight} mb-2`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className={`w-full px-4 py-3 bg-${theme.accent} border border-${theme.accent} rounded-xl focus:outline-none focus:ring-2 focus:ring-${theme.primary} focus:bg-white transition-all duration-200 resize-none`}
                  placeholder="Your message..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`w-full px-8 py-4 bg-${theme.primary} text-white rounded-xl hover:bg-${theme.primaryHover} transition-colors duration-300 flex items-center justify-center space-x-2`}
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
