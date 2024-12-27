import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './components/MainLayout';
import Login from './components/admin/Login';
import SimpleAdmin from './components/admin/SimpleAdmin';
import PrivateRoute from './components/PrivateRoute';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

// Main content component for the public site
const MainContent = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Contact />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/admin" element={<Login />} />
              <Route path="/admin/dashboard" element={
                <PrivateRoute>
                  <SimpleAdmin />
                </PrivateRoute>
              } />
              <Route path="*" element={<MainLayout />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
