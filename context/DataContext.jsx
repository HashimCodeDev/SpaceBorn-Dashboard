'use client';
import { createContext, useContext, useState } from 'react';
import { projects as initialProjects, tasks as initialTasks, teams as initialTeams, revenue as initialRevenue } from '../mock/mockData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [teams, setTeams] = useState(initialTeams);
  const [revenue, setRevenue] = useState(initialRevenue);

  const updateTaskStatus = (taskId, status) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const addProject = (project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now() }]);
  };

  const updateProject = (projectId, updates) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  return (
    <DataContext.Provider value={{
      projects, tasks, teams, revenue,
      updateTaskStatus, addProject, updateProject, deleteProject
    }}>
      {children}
    </DataContext.Provider>
  );
};