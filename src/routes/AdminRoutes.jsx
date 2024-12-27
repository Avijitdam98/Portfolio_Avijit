import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import CVManager from '../components/admin/CVManager';
import SecurityLogs from '../components/admin/SecurityLogs';
import { useAuth } from '../context/AuthContext'; // You'll need to create this

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cv-manager" element={<CVManager />} />
        <Route path="security" element={<SecurityLogs />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
