import React, { useEffect, useState } from 'react';
import { useContentStore } from '../../store/contentStore';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { AnimatedSection } from '../../components/ui/AnimatedSection';

interface ProfileFormData {
  name: string;
  title: string;
  email: string;
  bio: string;
  avatar_url: string;
}

const ProfilePage: React.FC = () => {
  const { profile, fetchProfile, updateProfile, isLoading } = useContentStore();
  const [success, setSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>();
  
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        title: profile.title,
        email: profile.email,
        bio: profile.bio,
        avatar_url: profile.avatar_url || '',
      });
    }
  }, [profile, reset]);
  
  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Initial profile setup if none exists
  if (!profile) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="text-yellow-700">
          No profile found. Please connect to Supabase and initialize your database.
        </p>
      </div>
    );
  }
  
  return (
    <AnimatedSection>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
      
      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
          <p className="text-green-700">Your profile has been successfully updated!</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
                fullWidth
              />
              
              <Input
                label="Professional Title"
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
                placeholder="e.g., Full Stack Developer"
                fullWidth
              />
            </div>
            
            <Input
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
              fullWidth
            />
            
            <Input
              label="Avatar URL"
              {...register('avatar_url')}
              placeholder="https://example.com/avatar.jpg"
              fullWidth
            />
            
            <TextArea
              label="Bio"
              {...register('bio', { required: 'Bio is required' })}
              error={errors.bio?.message}
              placeholder="Tell visitors about yourself..."
              fullWidth
            />
            
            <div className="flex justify-end">
              <Button type="submit" isLoading={isLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProfilePage;