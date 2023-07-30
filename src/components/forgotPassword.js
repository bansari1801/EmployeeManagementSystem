import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const backendUrl = process.env.REACT_APP_API_GATEWAY_URL;


  const handleSubmit = async(event) => {
    event.preventDefault();

    setEmailError(false);

    if (email == '') {
      setEmailError(true);
    }
    if (email) {
      console.log(email);
      const requestOptions = {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({ email: email }),
      };

      await Auth.forgotPassword(email);

      fetch(`${backendUrl}/forgotPassword`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
        })
        .catch((err) => console.log(err));
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
