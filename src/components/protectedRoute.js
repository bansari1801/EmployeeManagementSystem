// ProtectedRoute.js

import { CognitoUserPool } from 'amazon-cognito-identity-js';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_APP_CLIENT_ID,
  });

  useEffect(() => {
    checkUserAuthStatus();
  }, []);

  const checkUserAuthStatus = async () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      setIsLoggedIn(true);
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
