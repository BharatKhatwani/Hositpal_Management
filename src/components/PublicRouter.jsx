import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PublicRoute = ({ children }) => {
  const { token } = useAuth();

  // If the user is already logged in, redirect them to their dashboard
  if (token) {
    const role = localStorage.getItem('userRole');
    if (role === 'doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    } else if (role === 'patient') {
      return <Navigate to="/patient-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // If not logged in, allow them to access public routes
  return children;
};

export default PublicRoute;
