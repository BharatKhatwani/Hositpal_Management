import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login'; // Example: Add more routes as needed
import { AuthProvider } from './components/context/AuthContext';
import ActionPage from './components/pages/ActionPage';
import Home from './components/Appointment/Home';
import BookAppointment from './components/Appointment/BookAppointment';
import MyAppoinment from './components/Appointment/MyAppoinment';
import ProtectedRoute from './components/ProtectedRoute';
import DoctorDashboard from './components/Appointment/doctor_dasboard';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter >
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 

        {/* Protected routes */}
        <Route path="/patient-dashboard" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/book-appointment" element={
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        } />
        <Route path="/appointments" element={
          <ProtectedRoute>
            <MyAppoinment />
          </ProtectedRoute>
        } />

         <Route path="/doctor-dashboard" element={
          <ProtectedRoute>
            <DoctorDashboard/>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
