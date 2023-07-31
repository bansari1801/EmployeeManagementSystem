import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

export default function Navbar() {
  const navigate = useNavigate();
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_APP_CLIENT_ID,
  });

  const logout = async () => {
    const userData = {
      Username: localStorage.getItem('email'),
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    try {
      cognitoUser.signOut();
      navigate('/');
      console.log('User signed out successfully.');
      localStorage.removeItem("email")
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="alignLeft">
            Home
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
