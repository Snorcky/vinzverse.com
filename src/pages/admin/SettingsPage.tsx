import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { AnimatedSection } from '../../components/ui/AnimatedSection';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EmailFormData {
  newEmail: string;
}

const SettingsPage: React.FC = () => {
  const { user, updatePassword, updateEmail } = useAuthStore();
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const passwordForm = useForm<PasswordFormData>();
  const emailForm = useForm<EmailFormData>({
    defaultValues: {
      newEmail: user?.email || '',
    },
  });
  
  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      passwordForm.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await updatePassword(data.newPassword);
      setPasswordSuccess(true);
      passwordForm.reset();
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error: any) {
      passwordForm.setError('currentPassword', {
        type: 'manual',
        message: error.message || 'Failed to update password',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      await updateEmail(data.newEmail);
      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 3000);
    } catch (error: any) {
      emailForm.setError('newEmail', {
        type: 'manual',
        message: error.message || 'Failed to update email',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AnimatedSection>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
      
      <div className="space-y-8">
        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Email Address</h2>
          </div>
          
          <div className="p-6">
            {emailSuccess && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-green-700">Your email has been successfully updated!</p>
              </div>
            )}
            
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                {...emailForm.register('newEmail', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  }
                })}
                error={emailForm.formState.errors.newEmail?.message}
                fullWidth
              />
              
              <div className="flex justify-end">
                <Button type="submit" isLoading={isLoading}>
                  Update Email
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Password Settings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Password</h2>
          </div>
          
          <div className="p-6">
            {passwordSuccess && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-green-700">Your password has been successfully updated!</p>
              </div>
            )}
            
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
              <Input
                label="Current Password"
                type="password"
                {...passwordForm.register('currentPassword', { required: 'Current password is required' })}
                error={passwordForm.formState.errors.currentPassword?.message}
                fullWidth
              />
              
              <Input
                label="New Password"
                type="password"
                {...passwordForm.register('newPassword', { 
                  required: 'New password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  }
                })}
                error={passwordForm.formState.errors.newPassword?.message}
                fullWidth
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                {...passwordForm.register('confirmPassword', { required: 'Please confirm your password' })}
                error={passwordForm.formState.errors.confirmPassword?.message}
                fullWidth
              />
              
              <div className="flex justify-end">
                <Button type="submit" isLoading={isLoading}>
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SettingsPage;