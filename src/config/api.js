const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://portfolio-backend-h4cs.onrender.com'  // Replace with your actual Render URL
  : 'http://localhost:10000'; // Updated local port to match backend

export const API_ENDPOINTS = {
  base: API_BASE_URL,
  cv: `${API_BASE_URL}/api/cv`,
  admin: `${API_BASE_URL}/api/admin`,
  auth: `${API_BASE_URL}/api/auth`
};

export default API_ENDPOINTS;
