import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

  const backendUrl = process.env.REACT_APP_API_GATEWAY_URL;

  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get('email');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPasswordError(false);
    setConfirmPasswordError(false);

    if (verificationCode == '') {
      setVerificationCodeError(true);
    }

    if (password == '') {
      setPasswordError(true);
    }
    if (confirmPassword == '') {
      setConfirmPasswordError(true);
    }
    if (password && confirmPassword && verificationCode) {
      const requestOptions = {
        method: 'PUT',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      };

      try {
        await Auth.forgotPasswordSubmit(
          email,
          verificationCode, 
          password
        );
        fetch(`${backendUrl}/resetPassword`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.status === '200') {
              navigate('/');
            }
          });

        console.log('password changed successfully.');
      } catch (error) {
        console.log('errorrr', error);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="loginForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Reset your Password</h2>
          <TextField
            label="Verification Code"
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            value={verificationCode}
            error={verificationCodeError}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={confirmPassword}
            error={confirmPasswordError}
            fullWidth
            sx={{ mb: 3 }}
          />

          <Button variant="outlined" color="secondary" type="submit">
            Reset Password
          </Button>
        </form>
        <small>
          Know your password? <Link to="/">Sign In</Link>
        </small>
        <br />
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
