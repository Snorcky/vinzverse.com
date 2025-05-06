import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const { user, signOut } = useAuthStore();
  
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Mobile menu toggle */}
      <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
        <Menu size={24} />
      </button>
      
      {/* Page title - would typically be dynamic */}
      <h1 className="text-lg font-semibold text-gray-800 hidden md:block">Dashboard</h1>
      
      {/* Account dropdown */}
      <div className="relative">
        <button
          className="flex items-center space-x-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <span className="hidden md:block text-sm font-medium">{user?.email}</span>
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <Link
              to="/admin/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMenu(false)}
            >
              Account Settings
            </Link>
            <button
              onClick={() => {
                signOut();
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <span className="flex items-center">
                <LogOut size={16} className="mr-2" />
                Sign Out
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};