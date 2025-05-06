import React, { useEffect, useState } from 'react';
import { useContentStore } from '../../store/contentStore';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { AnimatedSection } from '../../components/ui/AnimatedSection';
import { Edit, Trash, Plus } from 'lucide-react';

interface ExperienceFormData {
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date?: string;
  description: string;
}

const ExperiencePage: React.FC = () => {
  const { 
    experiences, 
    fetchExperiences, 
    addExperience, 
    updateExperience, 
    deleteExperience, 
    profile,
    isLoading 
  } = useContentStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentExperienceId, setCurrentExperienceId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ExperienceFormData>();
  
  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);
  
  const handleAddNew = () => {
    setCurrentExperienceId(null);
    setIsEditing(false);
    setShowForm(true);
    reset({
      title: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      description: '',
    });
  };
  
  const handleEdit = (experience: any) => {
    setCurrentExperienceId(experience.id);
    setIsEditing(true);
    setShowForm(true);
    
    // Format dates for form
    const startDate = experience.start_date ? experience.start_date.substring(0, 7) : '';
    const endDate = experience.end_date ? experience.end_date.substring(0, 7) : '';
    
    reset({
      title: experience.title,
      company: experience.company,
      location: experience.location,
      start_date: startDate,
      end_date: endDate,
      description: experience.description,
    });
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      await deleteExperience(id);
    }
  };
  
  const onSubmit = async (data: ExperienceFormData) => {
    try {
      // Ensure dates are formatted correctly
      const formattedData = {
        ...data,
        start_date: data.start_date + '-01', // Add day to month-year format
        end_date: data.end_date ? data.end_date + '-01' : null,
      };
      
      if (isEditing && currentExperienceId) {
        await updateExperience(currentExperienceId, formattedData);
      } else {
        if (!profile) return;
        await addExperience({
          ...formattedData,
          profile_id: profile.id,
        });
      }
      setShowForm(false);
      reset();
    } catch (error) {
      console.error('Failed to save experience:', error);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
  };
  
  if (isLoading && experiences.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Check if profile exists
  if (!profile) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-yellow-700">
          Please complete your profile before adding experiences.
        </p>
      </div>
    );
  }
  
  return (
    <AnimatedSection>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Work Experience</h1>
        <Button onClick={handleAddNew} icon={<Plus size={16} />}>
          Add New Experience
        </Button>
      </div>
      
      {showForm && (
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isEditing ? 'Edit Experience' : 'Add New Experience'}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Job Title"
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
                fullWidth
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Company"
                  {...register('company', { required: 'Company is required' })}
                  error={errors.company?.message}
                  fullWidth
                />
                
                <Input
                  label="Location"
                  {...register('location', { required: 'Location is required' })}
                  error={errors.location?.message}
                  fullWidth
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Start Date"
                  type="month"
                  {...register('start_date', { required: 'Start date is required' })}
                  error={errors.start_date?.message}
                  fullWidth
                />
                
                <Input
                  label="End Date (leave empty for current position)"
                  type="month"
                  {...register('end_date')}
                  fullWidth
                />
              </div>
              
              <TextArea
                label="Description"
                {...register('description', { required: 'Description is required' })}
                error={errors.description?.message}
                fullWidth
              />
              
              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                  {isEditing ? 'Update Experience' : 'Add Experience'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Experiences list */}
      <div className="bg-white rounded-lg shadow">
        {experiences.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            <p>No work experience yet. Click "Add New Experience" to create your first entry.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {experiences.map((experience) => (
              <li key={experience.id} className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h3 className="text-lg font-medium text-gray-900">{experience.title}</h3>
                      <span className="hidden md:block text-gray-400">•</span>
                      <span className="text-gray-700">{experience.company}</span>
                    </div>
                    
                    <div className="text-gray-600 mt-1 flex flex-col md:flex-row md:items-center gap-2">
                      <span>{experience.location}</span>
                      <span className="hidden md:block text-gray-400">•</span>
                      <span>
                        {formatDate(experience.start_date)} — {formatDate(experience.end_date)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mt-3">{experience.description}</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(experience)}
                      icon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(experience.id)}
                      icon={<Trash size={16} />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AnimatedSection>
  );
};

export default ExperiencePage;