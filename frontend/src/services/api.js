import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Report Services
export const reportService = {
  createReport: (reportData) => api.post('/reports', reportData),
  getAllReports: (company) => 
    api.get('/reports', { params: { company } }),
  getReportById: (id) => api.get(`/reports/${id}`),
  getMyReports: () => api.get('/reports/user/my-reports'),
  searchCompany: (company) => 
    api.get('/reports/search', { params: { company } }),
  getPendingReports: () => api.get('/reports/admin/pending'),
  verifyReport: (id, notes) => 
    api.put(`/reports/${id}/verify`, { verificationNotes: notes }),
  rejectReport: (id, notes) => 
    api.put(`/reports/${id}/reject`, { verificationNotes: notes })
};

export default api;
