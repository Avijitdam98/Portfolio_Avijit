const BASE_URL = import.meta.env.PROD 
  ? 'https://portfolio-backend-h4cs.onrender.com'
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  base: BASE_URL,
  cv: `${BASE_URL}/api/cv`,
  admin: `${BASE_URL}/api/admin`,
  projects: `${BASE_URL}/api/projects`,
  contact: `${BASE_URL}/api/contact`,
  testimonials: `${BASE_URL}/api/testimonials`
};

export default API_ENDPOINTS;