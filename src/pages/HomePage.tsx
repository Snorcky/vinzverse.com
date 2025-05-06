import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { Projects } from '../components/home/Projects';
import { Skills } from '../components/home/Skills';
import { Experience } from '../components/home/Experience';
import { Contact } from '../components/home/Contact';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useContentStore } from '../store/contentStore';

const HomePage: React.FC = () => {
  const { fetchAllContent, isLoading } = useContentStore();
  
  useEffect(() => {
    fetchAllContent();
  }, [fetchAllContent]);
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;