'use client';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/Card';

export default function Dashboard() {
  const { user } = useAuth();
  const { projects, tasks, teams, revenue } = useData();

  if (!user) return null;

  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const runningProjects = projects.filter(project => project.status === 'Running').length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header title="Dashboard" />
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card title="Total Projects">
              <div className="text-3xl font-bold text-white">{projects.length}</div>
            </Card>
            <Card title="Running Projects">
              <div className="text-3xl font-bold text-white">{runningProjects}</div>
            </Card>
            <Card title="Total Tasks">
              <div className="text-3xl font-bold text-white">{tasks.length}</div>
            </Card>
            <Card title="Completed Tasks">
              <div className="text-3xl font-bold text-white">{completedTasks}</div>
            </Card>
          </div>

          {user.role === 'admin' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card title="Total Revenue">
                <div className="text-3xl font-bold text-white">${revenue.total.toLocaleString()}</div>
              </Card>
              <Card title="Pending Revenue">
                <div className="text-3xl font-bold text-white">${revenue.pending.toLocaleString()}</div>
              </Card>
              <Card title="Completed Revenue">
                <div className="text-3xl font-bold text-white">${revenue.completed.toLocaleString()}</div>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Recent Projects">
              <div className="space-y-3">
                {projects.slice(0, 3).map(project => (
                  <div key={project.id} className="flex justify-between items-center">
                    <span className="text-gray-300">{project.name}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'Running' ? 'bg-green-900 text-green-300' :
                      project.status === 'Planning' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Recent Tasks">
              <div className="space-y-3">
                {tasks.slice(0, 3).map(task => (
                  <div key={task.id} className="flex justify-between items-center">
                    <span className="text-gray-300">{task.title}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.status === 'Completed' ? 'bg-green-900 text-green-300' :
                      task.status === 'In Progress' ? 'bg-blue-900 text-blue-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}