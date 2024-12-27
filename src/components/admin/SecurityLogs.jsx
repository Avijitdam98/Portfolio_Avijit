import React, { useState, useEffect } from 'react';

const SecurityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all'); // all, blocked, suspicious
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [filter, page]);

  const fetchLogs = async () => {
    try {
      const response = await fetch(`/api/admin/security-logs?filter=${filter}&page=${page}`);
      const data = await response.json();
      setLogs(data.logs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching security logs:', error);
      setLoading(false);
    }
  };

  const handleBlockIP = async (ip) => {
    try {
      await fetch('/api/admin/block-ip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip }),
      });
      fetchLogs();
    } catch (error) {
      console.error('Error blocking IP:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Logs</option>
          <option value="blocked">Blocked IPs</option>
          <option value="suspicious">Suspicious Activity</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Endpoint
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.endpoint}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      log.blocked
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {log.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {!log.blocked && (
                      <button
                        onClick={() => handleBlockIP(log.ip)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Block IP
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {page}</span>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setPage(page + 1)}
          disabled={logs.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SecurityLogs;
