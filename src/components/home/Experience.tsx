import React from 'react';
import { useContentStore } from '../../store/contentStore';
import { AnimatedSection } from '../ui/AnimatedSection';
import { BriefcaseIcon } from 'lucide-react';

export const Experience: React.FC = () => {
  const { experiences } = useContentStore();
  
  // Fallback experience data if database is empty
  const fallbackExperiences = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      start_date: '2020-01',
      end_date: null,
      description: 'Leading the frontend development team, building scalable React applications, and implementing design systems.',
      profile_id: '1',
    },
    {
      id: '2',
      title: 'Web Developer',
      company: 'Digital Solutions',
      location: 'New York, NY',
      start_date: '2017-05',
      end_date: '2019-12',
      description: 'Developed responsive websites and web applications for various clients using modern JavaScript frameworks.',
      profile_id: '1',
    },
    {
      id: '3',
      title: 'Junior Developer',
      company: 'Creative Agency',
      location: 'Boston, MA',
      start_date: '2015-06',
      end_date: '2017-04',
      description: 'Created interactive websites and assisted in developing web applications for clients in various industries.',
      profile_id: '1',
    },
  ];
  
  const displayExperiences = experiences.length > 0 ? experiences : fallbackExperiences;
  
  // Format date to be more readable
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
  };
  
  return (
    <AnimatedSection id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Mes expériences</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mes expériences professionnelles les plus récentes
          </p>
        </div>
        
        <div className="relative border-l-4 border-blue-600 ml-4 md:ml-8 pl-8 space-y-12">
          {displayExperiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-11 bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center">
                <BriefcaseIcon size={16} className="text-white" />
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                  <div className="text-sm font-medium text-gray-500 mt-1 md:mt-0 bg-gray-100 px-3 py-1 rounded-full">
                    {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-800 font-medium">{exp.company}</div>
                  <div className="text-gray-600 text-sm">{exp.location}</div>
                </div>
                
                <p className="text-gray-700">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};