import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const backendUrl = process.env.REACT_APP_API_GATEWAY_URL;

  const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_APP_CLIENT_ID,
  };

  const userPool = new CognitoUserPool(poolData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);

    if (email == '') {
      setEmailError(true);
    }
    if (email) {
      const userData = {
        Username: email,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);
      const requestOptions = {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({ email: email }),
      };

      cognitoUser.forgotPassword({
        onSuccess: function (data) {
          fetch(`${backendUrl}/forgotPassword`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              alert(data.message);
            })
            .catch((err) => console.log(err));
        },
        onFailure: function (err) {
          alert(err.message || JSON.stringify(err));
        },
      });
    }
  };

  return (
    <React.Fragment>
      <div className="loginForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Forgot Password?</h2>
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
            error={emailError}
          />

          <Button variant="outlined" color="secondary" type="submit">
            Reset Password
          </Button>
        </form>
        <small>
          <Link to="/">Back to Sign In</Link>
        </small>
        <br />
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
