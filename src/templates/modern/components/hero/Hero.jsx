import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useScroll } from '../../context/ScrollProvider';

const Hero = ({ data }) => {
  const { theme, getEffectClasses, convertTailwindToRgb, getColorWithOpacity } = useTheme();
  const { scrollToSection } = useScroll();

  const socialLinks = [
    data.contact?.socialMedia?.github && { Icon: Github, url: data.contact.socialMedia.github },
    data.contact?.socialMedia?.linkedin && { Icon: Linkedin, url: data.contact.socialMedia.linkedin },
    data.contact?.socialMedia?.twitter && { Icon: Twitter, url: data.contact.socialMedia.twitter }
  ].filter(Boolean);

  return (
    <div style={{
      background: `linear-gradient(to bottom right, ${theme.bgGradient})`
    }} className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          style={{
            backgroundColor: getColorWithOpacity(convertTailwindToRgb(theme.primary), 0.2),
            backdropFilter: theme.glass ? 'blur(24px)' : 'none',
            mixBlendMode: theme.glass ? 'overlay' : 'normal'
          }}
          className="absolute top-40 right-0 w-72 h-72 rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            backgroundColor: getColorWithOpacity(convertTailwindToRgb(theme.primary), 0.1),
            backdropFilter: theme.glass ? 'blur(24px)' : 'none',
            mixBlendMode: theme.glass ? 'overlay' : 'normal'
          }}
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: theme.glass ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
          backdropFilter: theme.glass ? 'blur(8px)' : 'none',
        }}
        className={`relative max-w-6xl mx-auto w-full space-y-8 
          ${theme.glass ? 'p-12 rounded-3xl shadow-2xl' : ''} 
          ${getEffectClasses('card')}`}
      >
        <motion.h1 
          style={{ color: convertTailwindToRgb(theme.text) }}
          className={`text-5xl md:text-6xl lg:text-7xl font-bold
            ${theme.glass ? 'drop-shadow-lg' : ''}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I'm {' '}
          <span 
            style={{ 
              color: convertTailwindToRgb(theme.primary),
              textShadow: theme.glass ? `0 0 15px ${getColorWithOpacity(convertTailwindToRgb(theme.primary), 0.5)}` : 'none'
            }}
            className="transition-colors duration-300"
          >
            {data.home?.name}
          </span>
        </motion.h1>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 style={{ color: convertTailwindToRgb(theme.textLight) }} 
              className={`text-2xl md:text-3xl ${theme.glass ? 'drop-shadow-md' : ''}`}>
            I'm a{' '}
            <span style={{ 
              color: convertTailwindToRgb(theme.primary),
              textShadow: theme.glass ? `0 0 10px ${getColorWithOpacity(convertTailwindToRgb(theme.primary), 0.5)}` : 'none'
            }} className="font-semibold">
              {data.home?.profession}
            </span>
          </h2>
          <p style={{ color: convertTailwindToRgb(theme.textLight) }}
             className={`text-xl max-w-2xl ${theme.glass ? 'drop-shadow-md' : ''}`}>
            {data.home?.tagline}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-wrap gap-4 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {data.projects && (
            <motion.button 
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: theme.glass 
                  ? getColorWithOpacity(convertTailwindToRgb(theme.primary), 0.8)
                  : convertTailwindToRgb(theme.primary),
                color: '#ffffff'
              }}
              className={`px-8 py-4 rounded-xl transition-all duration-200 
                flex items-center gap-2 shadow-lg hover:shadow-xl
                ${theme.glass ? 'backdrop-blur-md hover:bg-opacity-90' : ''}
                ${getEffectClasses('button')}`}
            >
              View Work
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
          {data.contact && (
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: convertTailwindToRgb(theme.primary),
                color: convertTailwindToRgb(theme.primary),
                borderWidth: '2px',
              }}
              className={`px-8 py-4 rounded-xl transition-all duration-200 
                flex items-center gap-2
                ${theme.glass ? 'backdrop-blur-sm hover:backdrop-blur-md border-opacity-50 hover:border-opacity-75' : ''}
                ${getEffectClasses('button')}`}
            >
              Contact Me
              <Mail className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>

        {/* Social Links */}
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
                style={{
                  backgroundColor: theme.glass 
                    ? getColorWithOpacity(convertTailwindToRgb(theme.accent), 0.5)
                    : convertTailwindToRgb(theme.accent)
                }}
                className={`p-3 rounded-full transition-all duration-200 group
                  ${theme.glass ? 'backdrop-blur-sm hover:bg-opacity-70 shadow-lg hover:shadow-xl' : ''}
                  ${getEffectClasses('button')}`}
              >
                <social.Icon 
                  style={{ 
                    color: convertTailwindToRgb(theme.textLight),
                  }}
                  className={`w-6 h-6 transition-colors duration-200
                    group-hover:text-[${convertTailwindToRgb(theme.primary)}]
                    ${theme.glass ? 'drop-shadow-sm' : ''}`} 
                />
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Hero;

