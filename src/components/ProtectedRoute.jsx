import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Save the current path before redirecting
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    // Redirect to login page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
