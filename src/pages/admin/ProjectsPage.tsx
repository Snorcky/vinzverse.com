import React, { useEffect, useState } from 'react';
import { useContentStore } from '../../store/contentStore';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { AnimatedSection } from '../../components/ui/AnimatedSection';
import { Edit, Trash, Plus } from 'lucide-react';

interface ProjectFormData {
  title: string;
  description: string;
  image_url?: string;
  link_url?: string;
}

const ProjectsPage: React.FC = () => {
  const { 
    projects, 
    fetchProjects, 
    addProject, 
    updateProject, 
    deleteProject, 
    profile,
    isLoading 
  } = useContentStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>();
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
  const handleAddNew = () => {
    setCurrentProjectId(null);
    setIsEditing(false);
    setShowForm(true);
    reset({
      title: '',
      description: '',
      image_url: '',
      link_url: '',
    });
  };
  
  const handleEdit = (project: any) => {
    setCurrentProjectId(project.id);
    setIsEditing(true);
    setShowForm(true);
    reset({
      title: project.title,
      description: project.description,
      image_url: project.image_url || '',
      link_url: project.link_url || '',
    });
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };
  
  const onSubmit = async (data: ProjectFormData) => {
    try {
      if (isEditing && currentProjectId) {
        await updateProject(currentProjectId, data);
      } else {
        if (!profile) return;
        await addProject({
          ...data,
          profile_id: profile.id,
        });
      }
      setShowForm(false);
      reset();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };
  
  if (isLoading && projects.length === 0) {
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
          Please complete your profile before adding projects.
        </p>
      </div>
    );
  }
  
  return (
    <AnimatedSection>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Button onClick={handleAddNew} icon={<Plus size={16} />}>
          Add New Project
        </Button>
      </div>
      
      {showForm && (
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Project Title"
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
                fullWidth
              />
              
              <TextArea
                label="Description"
                {...register('description', { required: 'Description is required' })}
                error={errors.description?.message}
                fullWidth
              />
              
              <Input
                label="Image URL"
                {...register('image_url')}
                placeholder="https://example.com/image.jpg"
                fullWidth
              />
              
              <Input
                label="Project Link"
                {...register('link_url')}
                placeholder="https://yourproject.com"
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
                  {isEditing ? 'Update Project' : 'Add Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Projects list */}
      <div className="bg-white rounded-lg shadow">
        {projects.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            <p>No projects yet. Click "Add New Project" to create your first project.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {projects.map((project) => (
              <li key={project.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 mt-1">{project.description}</p>
                    {project.link_url && (
                      <a 
                        href={project.link_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(project)}
                      icon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(project.id)}
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

export default ProjectsPage;