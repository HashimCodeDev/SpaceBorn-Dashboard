'use client';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/Card';

export default function Revenue() {
  const { user } = useAuth();
  const { revenue } = useData();

  if (!user || user.role !== 'admin') {
    return <div className="text-white p-6">Access denied</div>;
  }

  const completionRate = ((revenue.completed / revenue.total) * 100).toFixed(1);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header title="Revenue" />
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card title="Total Revenue">
              <div className="text-4xl font-bold text-white mb-2">
                ${revenue.total.toLocaleString()}
              </div>
              <div className="text-gray-400">All time revenue</div>
            </Card>
            
            <Card title="Completed Revenue">
              <div className="text-4xl font-bold text-green-400 mb-2">
                ${revenue.completed.toLocaleString()}
              </div>
              <div className="text-gray-400">{completionRate}% of total</div>
            </Card>
            
            <Card title="Pending Revenue">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                ${revenue.pending.toLocaleString()}
              </div>
              <div className="text-gray-400">Awaiting completion</div>
            </Card>
          </div>

          <Card title="Revenue Breakdown">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Completed Projects</span>
                <span className="text-green-400 font-semibold">
                  ${revenue.completed.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full" 
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Pending Projects</span>
                <span className="text-yellow-400 font-semibold">
                  ${revenue.pending.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full" 
                  style={{ width: `${((revenue.pending / revenue.total) * 100)}%` }}
                ></div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}