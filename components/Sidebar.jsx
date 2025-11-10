'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const getNavItems = () => {
    const baseItems = [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/teams', label: 'Teams' },
      { href: '/tasks', label: 'Tasks' }
    ];

    if (user.role === 'admin') {
      return [
        ...baseItems.slice(0, 1),
        { href: '/projects', label: 'Projects' },
        { href: '/revenue', label: 'Revenue' },
        ...baseItems.slice(1)
      ];
    }

    if (user.role === 'core') {
      return [
        ...baseItems.slice(0, 1),
        { href: '/projects', label: 'Projects' },
        ...baseItems.slice(1)
      ];
    }

    return baseItems;
  };

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      
      <div className={`fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-800 transform transition-transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <h2 className="text-white text-xl font-bold mb-8">Dashboard</h2>
          <nav className="space-y-2">
            {getNavItems().map(item => (
              <Link 
                key={item.href}
                href={item.href}
                className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button 
              onClick={logout}
              className="w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;