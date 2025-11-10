'use client';
import { useAuth } from '../context/AuthContext';

const Header = ({ title }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">{title}</h1>
        <div className="text-gray-300">
          Welcome, {user.name} ({user.role})
        </div>
      </div>
    </header>
  );
};

export default Header;