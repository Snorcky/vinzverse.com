import React from 'react';
import { useContentStore } from '../../store/contentStore';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile } = useContentStore();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, href: '#', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Mail size={20} />, href: `mailto:${profile?.email || ''}`, label: 'Email' },
  ];
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <h3 className="text-xl font-bold mb-4">{profile?.name || 'Portfolio'}</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              {profile?.bio || 'A showcase of my work, skills, and experience.'}
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="/#experience" className="text-gray-400 hover:text-white transition-colors">Experience</a></li>
              <li><a href="/#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Social links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {currentYear} {profile?.name}. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};