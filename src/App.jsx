import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Appointment/Home';
import BookAppointment from './components/Appointment/BookAppointment';
import MyAppoinment from './components/Appointment/MyAppoinment';
import DoctorDashboard from './components/Appointment/doctor_dasboard';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';

import ProtectedRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRouter';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Public Routes (blocked if token is present) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* ✅ Protected Routes (role-based) */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <MyAppoinment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔒 Unauthorized access page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
