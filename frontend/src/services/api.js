import axios from 'axios';

const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://full-stack-mern-application-243c.onrender.com/api';   // ← Your backend URL
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;