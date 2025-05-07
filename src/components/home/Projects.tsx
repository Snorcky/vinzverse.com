import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useContentStore } from '../../store/contentStore';
import { AnimatedSection } from '../ui/AnimatedSection';

export const Projects: React.FC = () => {
  const { projects } = useContentStore();
  
  // Fallback projects in case the database is empty
  const fallbackProjects = [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-featured online shopping platform built with React, Node.js, and MongoDB.',
      image_url: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link_url: '#',
      profile_id: '1',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A productivity app that helps teams organize and track their projects and tasks.',
      image_url: 'https://images.pexels.com/photos/1043506/pexels-photo-1043506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link_url: '#',
      profile_id: '1',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'A responsive portfolio website designed to showcase projects and skills.',
      image_url: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link_url: '#',
      profile_id: '1',
      created_at: new Date().toISOString(),
    },
  ];
  
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;
  
  return (
    <AnimatedSection id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Mes projets</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez dans cette section mes projets réalisés dans tout type de domaine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {project.image_url && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex justify-between items-center">
                  {project.link_url && (
                    <a
                      href={project.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Live Demo
                    </a>
                  )}
                  
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-gray-800"
                  >
                    <Github size={16} className="mr-1" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};