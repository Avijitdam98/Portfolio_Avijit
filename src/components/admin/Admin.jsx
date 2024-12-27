import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Admin = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Welcome, {user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors">
                Update Portfolio
              </button>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors">
                Manage Projects
              </button>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors">
                Edit About
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <p className="text-gray-400">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
