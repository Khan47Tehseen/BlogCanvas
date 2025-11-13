import axios from 'axios';


const API_URL = 'https://blogcanvas-6p7v.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
};

// Blog Posts API calls
export const postAPI = {
  getAll: () => api.get('/api/posts'),
  getById: (id) => api.get(`/api/posts/${id}`),
  create: (postData) => api.post('/api/posts', postData),
  update: (id, postData) => api.put(`/api/posts/${id}`, postData),
  delete: (id) => api.delete(`/api/posts/${id}`),
};

export default api;