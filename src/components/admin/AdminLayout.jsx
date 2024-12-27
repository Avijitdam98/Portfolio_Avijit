import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            <span className="mx-4">Dashboard</span>
          </Link>
          <Link
            to="/admin/cv-manager"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            <span className="mx-4">CV Manager</span>
          </Link>
          <Link
            to="/admin/security"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            <span className="mx-4">Security Logs</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              <button className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
