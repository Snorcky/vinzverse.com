import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useContentStore } from '../../store/contentStore';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const { profile } = useContentStore();
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {profile?.name || 'Hello, I\'m Vincent'}
        </motion.h1>
        
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {profile?.title || 'Software Developer & Designer'}
        </motion.h2>
        
        <motion.p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {profile?.bio || 'I create beautiful, functional websites and applications using modern technologies.'}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-white text-blue-900 hover:bg-blue-50"
          >
            View My Work
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: 'reverse' }}
        onClick={scrollToProjects}
      >
        <ChevronDown size={32} />
      </motion.div>
    </div>
  );
};