import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import './App.css';

// Lazy load heavy components for better initial load time
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const ScamsPage = lazy(() => import('./pages/ScamsPage').then(m => ({ default: m.ScamsPage })));
const ReportPage = lazy(() => import('./pages/ReportPage').then(m => ({ default: m.ReportPage })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const AdminPanel = lazy(() => import('./pages/AdminPanel').then(m => ({ default: m.AdminPanel })));

const LoadingFallback = () => <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/scams" element={<ScamsPage />} />
            
            <Route 
              path="/report" 
              element={
                <ProtectedRoute>
                  <ReportPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/my-reports" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
