import React, { useEffect } from 'react';
import { useContentStore } from '../../store/contentStore';
import { AnimatedSection } from '../../components/ui/AnimatedSection';

const DashboardPage: React.FC = () => {
  const { 
    profile, 
    projects, 
    skills, 
    experiences, 
    fetchAllContent, 
    isLoading 
  } = useContentStore();
  
  useEffect(() => {
    fetchAllContent();
  }, [fetchAllContent]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  const stats = [
    { label: 'Projects', value: projects.length, color: 'bg-blue-100 text-blue-800' },
    { label: 'Skills', value: skills.length, color: 'bg-green-100 text-green-800' },
    { label: 'Experiences', value: experiences.length, color: 'bg-purple-100 text-purple-800' },
  ];
  
  return (
    <AnimatedSection>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {profile ? (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.title}</p>
              <p className="text-gray-500 text-sm mt-1">{profile.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-700">Your profile is not set up. Please complete your profile information.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{stat.label}</span>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-600">
            Welcome to your portfolio admin dashboard. Use the navigation on the left to manage your content.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default DashboardPage;