// components/Unauthorized.jsx
import React from 'react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-2">🚫 Access Denied</h1>
        <p className="text-lg text-gray-600">You are not authorized to view this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
