import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Send,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export const Contact = ({ data }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formRef.current) {
        await emailjs.sendForm(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          formRef.current,
          "YOUR_PUBLIC_KEY"
        );
        setSuccess(true);
        if (formRef.current) formRef.current.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Mail className="text-purple-400" size={24} />
                <a
                  href={`mailto:${data.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {data.email}
                </a>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <Phone className="text-purple-400" size={24} />
                <a
                  href={`tel:${data.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {data.phone}
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="text-purple-400" size={24} />
                <span className="text-gray-300">{data.location}</span>
              </div>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg backdrop-blur-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                Social Links
              </h3>
              <div className="space-y-4">
                <a
                  href={data.socialMedia.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors"
                >
                  <Github size={24} />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href={data.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin size={24} />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={data.socialMedia.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors"
                >
                  <Globe size={24} />
                  <span>Portfolio Website</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-purple-900/20 p-8 rounded-lg backdrop-blur-lg"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                )}
              </button>

              {success && (
                <p className="text-green-400 text-center">
                  Message sent successfully!
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
