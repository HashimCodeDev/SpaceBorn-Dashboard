'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { users } from '../../mock/mockData';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Table from '../../components/Table';

export default function Projects() {
  const { user } = useAuth();
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', status: 'Planning', assignedTo: [] });

  if (!user || (user.role !== 'admin' && user.role !== 'core')) {
    return <div className="text-white p-6">Access denied</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(formData);
    setFormData({ name: '', status: 'Planning', assignedTo: [] });
    setShowForm(false);
  };

  const getUserName = (userId) => {
    const foundUser = users.find(u => u.id === userId);
    return foundUser ? foundUser.name : 'Unknown';
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header title="Projects" />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">All Projects</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              Add Project
            </button>
          </div>

          {showForm && (
            <Card title="Add New Project" className="mb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                  required
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                >
                  <option value="Planning">Planning</option>
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="flex gap-2">
                  <button type="submit" className="bg-white text-black px-4 py-2 rounded">
                    Add
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Card>
          )}

          <Card>
            <Table
              headers={['Name', 'Status', 'Assigned To', 'Actions']}
              data={projects}
              renderRow={(project) => (
                <>
                  <td className="py-3 px-4 text-white">{project.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'Running' ? 'bg-green-900 text-green-300' :
                      project.status === 'Planning' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {project.assignedTo.map(userId => getUserName(userId)).join(', ')}
                  </td>
                  <td className="py-3 px-4">
                    {user.role === 'admin' && (
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </>
              )}
            />
          </Card>
        </main>
      </div>
    </div>
  );
}