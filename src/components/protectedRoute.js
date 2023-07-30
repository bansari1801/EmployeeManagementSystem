// ProtectedRoute.js

import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserAuthStatus();
  }, []);

  const checkUserAuthStatus = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  return loading ? (
    // Optionally, you can display a loading spinner or component while checking the authentication status
    <div>Loading...</div>
  ) : isLoggedIn ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
