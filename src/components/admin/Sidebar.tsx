import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  User, 
  Settings, 
  Briefcase, 
  Home, 
  FolderKanban, 
  Code,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/admin/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/admin/projects', label: 'Projects', icon: <FolderKanban size={20} /> },
    { path: '/admin/skills', label: 'Skills', icon: <Code size={20} /> },
    { path: '/admin/experience', label: 'Experience', icon: <Briefcase size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <div className="w-64 bg-white shadow-md h-screen hidden md:block">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t">
        <NavLink
          to="/"
          className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Home className="mr-3" size={20} />
          <span>Back to Site</span>
        </NavLink>
      </div>
    </div>
  );
};