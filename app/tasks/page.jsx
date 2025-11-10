'use client';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { users } from '../../mock/mockData';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Table from '../../components/Table';

export default function Tasks() {
  const { user } = useAuth();
  const { tasks, updateTaskStatus } = useData();

  if (!user) return null;

  const getUserName = (userId) => {
    const foundUser = users.find(u => u.id === userId);
    return foundUser ? foundUser.name : 'Unknown';
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  const canEditTask = (task) => {
    return user.role === 'admin' || user.role === 'core' || task.assignedTo === user.id;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header title="Tasks" />
        <main className="p-6">
          <Card title="All Tasks">
            <Table
              headers={['Task', 'Status', 'Assigned To', 'Deadline', 'Actions']}
              data={tasks}
              renderRow={(task) => (
                <>
                  <td className="py-3 px-4 text-white">{task.title}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.status === 'Completed' ? 'bg-green-900 text-green-300' :
                      task.status === 'In Progress' ? 'bg-blue-900 text-blue-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{getUserName(task.assignedTo)}</td>
                  <td className="py-3 px-4 text-gray-300">{task.deadline}</td>
                  <td className="py-3 px-4">
                    {canEditTask(task) && (
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-700"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    )}
                  </td>
                </>
              )}
            />
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Pending Tasks">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {tasks.filter(task => task.status === 'Pending').length}
              </div>
              <div className="text-gray-400">Tasks waiting to start</div>
            </Card>
            
            <Card title="In Progress">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {tasks.filter(task => task.status === 'In Progress').length}
              </div>
              <div className="text-gray-400">Currently active tasks</div>
            </Card>
            
            <Card title="Completed">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {tasks.filter(task => task.status === 'Completed').length}
              </div>
              <div className="text-gray-400">Finished tasks</div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}