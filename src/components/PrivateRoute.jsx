import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import React from 'react';
import Unauthorized from './Unauthorized';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token } = useAuth();
  const role = localStorage.getItem('userRole'); // e.g., 'doctor' or 'patient'

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; // or a 403 page
  }

  return children;
};

export default ProtectedRoute;
