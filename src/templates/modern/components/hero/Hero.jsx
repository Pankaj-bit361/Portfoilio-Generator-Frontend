import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Hero = ({ data }) => {
  const { theme, getEffectClasses } = useTheme();

  const socialLinks = [
    data.contact?.socialMedia?.github && { Icon: Github, url: data.contact.socialMedia.github },
    data.contact?.socialMedia?.linkedin && { Icon: Linkedin, url: data.contact.socialMedia.linkedin },
    data.contact?.socialMedia?.twitter && { Icon: Twitter, url: data.contact.socialMedia.twitter }
  ].filter(Boolean);
    
  return (
    <div className={`relative min-h-screen flex flex-col justify-center px-8 lg:px-24 bg-gradient-to-br ${theme.bgGradient}`}>
      {/* Enhanced Background Elements with Glass Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className={`absolute top-40 right-0 w-72 h-72 bg-${theme.primary}/20 rounded-full blur-3xl 
            ${theme.glass ? 'backdrop-blur-3xl mix-blend-overlay' : ''}`}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`absolute bottom-0 left-0 w-96 h-96 bg-${theme.primary}/10 rounded-full blur-3xl
            ${theme.glass ? 'backdrop-blur-3xl mix-blend-overlay' : ''}`}
        />
      </div>

      {/* Content with Glass Effects */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative max-w-6xl mx-auto w-full space-y-8 
          ${theme.glass ? 'backdrop-blur-sm bg-white/5 p-12 rounded-3xl shadow-2xl' : ''} 
          ${getEffectClasses('card')}`}
      >
        <motion.h1 
          className={`text-5xl md:text-6xl lg:text-7xl font-bold text-${theme.text}
            ${theme.glass ? 'drop-shadow-lg' : ''}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I'm <span className={`text-${theme.primary} hover:text-${theme.primaryHover} transition-colors
            ${theme.glass ? 'drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : ''}`}>{data.home?.name}</span>
        </motion.h1>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={`text-2xl md:text-3xl text-${theme.textLight}
            ${theme.glass ? 'drop-shadow-md' : ''}`}>
            I'm a <span className={`text-${theme.primary} font-semibold
              ${theme.glass ? 'drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : ''}`}>{data.home?.profession}</span>
          </h2>
          <p className={`text-xl text-${theme.textLight} max-w-2xl
            ${theme.glass ? 'drop-shadow-md' : ''}`}>
            {data.home?.tagline}
          </p>
        </motion.div>

        {/* Enhanced Buttons with Glass Effects */}
        <motion.div 
          className="flex flex-wrap gap-4 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {data.projects && (
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 bg-${theme.primary} text-white rounded-xl 
                hover:bg-${theme.primaryHover} transition-all duration-200 
                flex items-center gap-2 shadow-lg hover:shadow-xl
                ${theme.glass ? 'backdrop-blur-md bg-opacity-80 hover:bg-opacity-90' : ''}
                ${getEffectClasses('button')}`}
            >
              View Work
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          )}
          {data.contact && (
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 border-2 border-${theme.primary} text-${theme.primary} 
                rounded-xl hover:bg-${theme.accent} transition-all duration-200 
                flex items-center gap-2
                ${theme.glass ? 'backdrop-blur-sm hover:backdrop-blur-md border-opacity-50 hover:border-opacity-75' : ''}
                ${getEffectClasses('button')}`}
            >
              Contact Me
              <Mail className="w-5 h-5" />
            </motion.a>
          )}
        </motion.div>

        {/* Enhanced Social Links with Glass Effects */}
        {socialLinks.length > 0 && (
          <motion.div 
            className="flex gap-6 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-3 bg-${theme.accent} rounded-full 
                  hover:bg-${theme.secondary} transition-all duration-200 group
                  ${theme.glass ? 'backdrop-blur-sm bg-opacity-50 hover:bg-opacity-70 shadow-lg hover:shadow-xl' : ''}
                  ${getEffectClasses('button')}`}
              >
                <social.Icon className={`w-6 h-6 text-${theme.textLight} 
                  group-hover:text-${theme.primary}
                  ${theme.glass ? 'drop-shadow-sm' : ''}`} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Hero;