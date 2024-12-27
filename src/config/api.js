const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (process.env.NODE_ENV === 'production'
    ? 'https://portfolio-backend-h4cs.onrender.com'
    : 'http://localhost:5000');

export const API_ENDPOINTS = {
  base: API_BASE_URL,
  cv: `${API_BASE_URL}/api/cv`,
  admin: `${API_BASE_URL}/api/admin`,
  auth: `${API_BASE_URL}/api/auth`
};

export default API_ENDPOINTS;