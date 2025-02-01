
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
  const { theme, getEffectClasses, convertTailwindToRgb, getColorWithOpacity } = useTheme();

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

  const inputStyles = {
    base: `w-full px-4 py-3 rounded-xl transition-all duration-200`,
    default: {
      backgroundColor: getColorWithOpacity(convertTailwindToRgb(theme.accent), 0.1),
      borderColor: getColorWithOpacity(convertTailwindToRgb(theme.accent), 0.2),
      color: convertTailwindToRgb(theme.text)
    },
    focus: {
      outline: 'none',
      backgroundColor: '#ffffff',
      boxShadow: `0 0 0 2px ${getColorWithOpacity(convertTailwindToRgb(theme.primary), 0.3)}`
    }
  };

  return (
    <section 
      style={{
        background: `linear-gradient(to bottom right, ${theme.bgGradient})`
      }}
      className="py-32"
    >
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
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
            Contact Me
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
            Let's discuss your project and bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 
                style={{ color: convertTailwindToRgb(theme.text) }}
                className="text-2xl font-semibold"
              >
                Get in Touch
              </h3>
              <p 
                style={{ color: convertTailwindToRgb(theme.textLight) }}
                className="leading-relaxed"
              >
                I'm currently available for freelance work and full-time
                positions. Feel free to reach out if you have any questions or
                would like to collaborate.
              </p>
            </div>
            {/* Contact Information */}
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
                      style={{
                        backgroundColor: getColorWithOpacity(convertTailwindToRgb(theme.accent), 0.1),
                        color: convertTailwindToRgb(theme.primary)
                      }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p 
                        style={{ color: convertTailwindToRgb(theme.textLight) }}
                        className="text-sm"
                      >
                        {item.label}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          style={{ color: convertTailwindToRgb(theme.text) }}
                          className="font-medium hover:text-[var(--theme-primary)] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p 
                          style={{ color: convertTailwindToRgb(theme.text) }}
                          className="font-medium"
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="space-y-4">
                <h4 
                  style={{ color: convertTailwindToRgb(theme.text) }}
                  className="font-medium"
                >
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: getColorWithOpacity(convertTailwindToRgb(theme.accent), 0.1),
                        color: convertTailwindToRgb(theme.textLight)
                      }}
                      className="p-3 rounded-xl transition-colors duration-300 hover:text-[var(--theme-primary)]"
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

          {/* Contact Form */}
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
                      style={{ color: convertTailwindToRgb(theme.textLight) }}
                      className="block text-sm font-medium mb-2 capitalize"
                    >
                      {field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      name={field}
                      className={inputStyles.base}
                      style={inputStyles.default}
                      placeholder={field === "name" ? "Name" : "name@example.com"}
                      required
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  style={{ color: convertTailwindToRgb(theme.textLight) }}
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={inputStyles.base}
                  style={inputStyles.default}
                  placeholder="Project Inquiry"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{ color: convertTailwindToRgb(theme.textLight) }}
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className={`${inputStyles.base} resize-none`}
                  style={inputStyles.default}
                  placeholder="Your message..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                style={{
                  backgroundColor: convertTailwindToRgb(theme.primary),
                  color: '#ffffff'
                }}
                className="w-full px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = convertTailwindToRgb(theme.primaryHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = convertTailwindToRgb(theme.primary);
                }}
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
