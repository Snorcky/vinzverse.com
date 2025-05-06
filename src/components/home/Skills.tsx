import React from 'react';
import { useContentStore } from '../../store/contentStore';
import { AnimatedSection } from '../ui/AnimatedSection';

export const Skills: React.FC = () => {
  const { skills } = useContentStore();
  
  // Organize skills by category
  const skillsByCategory: Record<string, typeof skills> = {};
  
  // Use fallback skills if there are none in the database
  const fallbackSkills = [
    { id: '1', name: 'React', category: 'Frontend', proficiency: 90, profile_id: '1' },
    { id: '2', name: 'TypeScript', category: 'Frontend', proficiency: 85, profile_id: '1' },
    { id: '3', name: 'Node.js', category: 'Backend', proficiency: 80, profile_id: '1' },
    { id: '4', name: 'MongoDB', category: 'Backend', proficiency: 75, profile_id: '1' },
    { id: '5', name: 'Figma', category: 'Design', proficiency: 85, profile_id: '1' },
    { id: '6', name: 'AWS', category: 'DevOps', proficiency: 70, profile_id: '1' },
  ];
  
  const displaySkills = skills.length > 0 ? skills : fallbackSkills;
  
  displaySkills.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });
  
  const categories = Object.keys(skillsByCategory).sort();
  
  // Color mapping for different categories
  const categoryColors: Record<string, string> = {
    'Frontend': 'bg-blue-600',
    'Backend': 'bg-emerald-600',
    'Design': 'bg-purple-600',
    'DevOps': 'bg-orange-600',
    'Mobile': 'bg-pink-600',
    'Database': 'bg-yellow-600',
  };
  
  const getDefaultColor = (category: string) => {
    return categoryColors[category] || 'bg-gray-600';
  };
  
  return (
    <AnimatedSection id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">My Skills</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are the technologies and tools I specialize in, organized by category.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div key={category} className="bg-gray-50 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{category}</h3>
              <div className="space-y-4">
                {skillsByCategory[category].map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-800">{skill.name}</span>
                      <span className="text-gray-600">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${getDefaultColor(category)}`}
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};