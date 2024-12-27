import React, { Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import AnimatedCursor from './components/AnimatedCursor';
import ParallaxBackground from './components/ParallaxBackground';
import ScrollProgress from './components/ScrollProgress';
import ScrollLines from './components/ScrollLines';
import Loading from './components/Loading';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Login from './components/admin/Login';
import SimpleAdmin from './components/admin/SimpleAdmin';

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedCursor />
              <ParallaxBackground />
              <ScrollProgress />
              <ScrollLines />
              
              <Suspense fallback={<Loading />}>
                <Routes>
                  {/* Admin routes */}
                  <Route path="/admin/login" element={<Login />} />
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute>
                        <Routes>
                          <Route index element={<Navigate to="dashboard" replace />} />
                          <Route path="dashboard" element={<SimpleAdmin />} />
                        </Routes>
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Public routes */}
                  <Route path="/*" element={<MainContent />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
