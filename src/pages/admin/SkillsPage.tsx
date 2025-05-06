import React, { useEffect, useState } from 'react';
import { useContentStore } from '../../store/contentStore';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { AnimatedSection } from '../../components/ui/AnimatedSection';
import { Edit, Trash, Plus } from 'lucide-react';

interface SkillFormData {
  name: string;
  category: string;
  proficiency: number;
}

const SkillsPage: React.FC = () => {
  const { 
    skills, 
    fetchSkills, 
    addSkill, 
    updateSkill, 
    deleteSkill, 
    profile,
    isLoading 
  } = useContentStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkillId, setCurrentSkillId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SkillFormData>();
  
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);
  
  // Group skills by category
  const skillsByCategory: Record<string, typeof skills> = {};
  skills.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });
  
  const categories = Object.keys(skillsByCategory).sort();
  
  const handleAddNew = () => {
    setCurrentSkillId(null);
    setIsEditing(false);
    setShowForm(true);
    reset({
      name: '',
      category: '',
      proficiency: 75,
    });
  };
  
  const handleEdit = (skill: any) => {
    setCurrentSkillId(skill.id);
    setIsEditing(true);
    setShowForm(true);
    reset({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
    });
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(id);
    }
  };
  
  const onSubmit = async (data: SkillFormData) => {
    try {
      if (isEditing && currentSkillId) {
        await updateSkill(currentSkillId, data);
      } else {
        if (!profile) return;
        await addSkill({
          ...data,
          profile_id: profile.id,
        });
      }
      setShowForm(false);
      reset();
    } catch (error) {
      console.error('Failed to save skill:', error);
    }
  };
  
  if (isLoading && skills.length === 0) {
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
          Please complete your profile before adding skills.
        </p>
      </div>
    );
  }
  
  return (
    <AnimatedSection>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
        <Button onClick={handleAddNew} icon={<Plus size={16} />}>
          Add New Skill
        </Button>
      </div>
      
      {showForm && (
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isEditing ? 'Edit Skill' : 'Add New Skill'}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Skill Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
                fullWidth
              />
              
              <Input
                label="Category"
                {...register('category', { required: 'Category is required' })}
                error={errors.category?.message}
                placeholder="e.g., Frontend, Backend, Design"
                fullWidth
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Proficiency ({register('proficiency')?.value || 75}%)
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  {...register('proficiency', { 
                    required: 'Proficiency is required',
                    valueAsNumber: true 
                  })}
                  className="w-full"
                />
              </div>
              
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
                  {isEditing ? 'Update Skill' : 'Add Skill'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Skills list grouped by category */}
      <div className="space-y-8">
        {skills.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            <p>No skills yet. Click "Add New Skill" to create your first skill.</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category} className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">{category}</h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {skillsByCategory[category].map((skill) => (
                  <li key={skill.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0 w-full md:w-2/3">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{skill.name}</h3>
                          <span className="text-gray-600">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full bg-blue-600"
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(skill)}
                          icon={<Edit size={16} />}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleDelete(skill.id)}
                          icon={<Trash size={16} />}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </AnimatedSection>
  );
};

export default SkillsPage;