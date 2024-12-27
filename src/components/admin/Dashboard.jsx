import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCVs: 0,
    recentVisits: 0,
    blockedIPs: 0
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* CV Statistics */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total CVs</h3>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">{stats.totalCVs}</p>
        </div>

        {/* Recent Visits */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Recent Visits</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">{stats.recentVisits}</p>
        </div>

        {/* Blocked IPs */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Blocked IPs</h3>
          <p className="mt-2 text-3xl font-semibold text-red-600">{stats.blockedIPs}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div className="mt-4">
          {/* Activity list will be implemented later */}
          <p className="text-gray-500">Loading activity...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
