'use client';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { users } from '../../mock/mockData';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Table from '../../components/Table';

export default function Teams() {
  const { user } = useAuth();
  const { teams } = useData();

  if (!user) return null;

  const getUserName = (userId) => {
    const foundUser = users.find(u => u.id === userId);
    return foundUser ? foundUser.name : 'Unknown';
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header title="Teams" />
        <main className="p-6">
          <Card title="All Teams">
            <Table
              headers={['Team Name', 'Members', 'Size']}
              data={teams}
              renderRow={(team) => (
                <>
                  <td className="py-3 px-4 text-white font-semibold">{team.name}</td>
                  <td className="py-3 px-4 text-gray-300">
                    {team.members.map(userId => getUserName(userId)).join(', ')}
                  </td>
                  <td className="py-3 px-4 text-gray-300">{team.members.length} members</td>
                </>
              )}
            />
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map(team => (
              <Card key={team.id} title={team.name}>
                <div className="space-y-2">
                  {team.members.map(userId => {
                    const member = users.find(u => u.id === userId);
                    return (
                      <div key={userId} className="flex justify-between items-center">
                        <span className="text-gray-300">{member?.name}</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {member?.role}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}