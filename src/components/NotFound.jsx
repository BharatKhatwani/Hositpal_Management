import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page not found.</p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;