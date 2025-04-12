import axios from 'axios';
import useAuthStore from '../store/authStore';

const API_URL = 'http://localhost:8000/api';

// Mock data
const MOCK_USER = {
  email: 'student@unive.com',
  password: 'hackathon2025'
};

// Mock functions
const mockLogin = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  if (credentials.email === MOCK_USER.email && credentials.password === MOCK_USER.password) {
    return {
      data: {
        token: 'mock-jwt-token',
        user: {
          id: 1,
          email: MOCK_USER.email,
          username: 'student'
        }
      }
    };
  }
  throw new Error('Invalid credentials');
};

const mockPostTask = async (payload) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  const newTask = {
    id: Date.now(),
    title: payload.title,
    description: payload.description,
    status: 'Sent',
    created_at: new Date().toISOString()
  };
  
  return {
    data: newTask
  };
};

const mockDeleteTask = async (taskId) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return { data: { id: taskId } };
};

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: mockLogin, // Using mock login instead of real API
  register: (userData) => api.post('/auth/register/', userData),
  getCurrentUser: () => api.get('/auth/user/'),
};

export const tasksAPI = {
  getTasks: () => api.get('/tasks/'),
  getTask: (id) => api.get(`/tasks/${id}/`),
  createTask: mockPostTask, // Using mock task creation instead of real API
  updateTask: (id, data) => api.put(`/tasks/${id}/`, data),
  deleteTask: mockDeleteTask, // Using mock task deletion instead of real API
};

export default api; 