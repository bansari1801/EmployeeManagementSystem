import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { Auth } from 'aws-amplify';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_API_GATEWAY_URL;


  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (email == '') {
      setEmailError(true);
    }
    if (password == '') {
      setPasswordError(true);
    }

    if (email && password) {
      console.log(email, password);

      try {
        await Auth.signIn({ username: email, password });
        const requestOptions = {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: JSON.stringify({ email: email, password: password }),
        };

        fetch(`${backendUrl}/loginEmployee`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.status === '200') {
              if (data.isAdmin) {
                navigate('/home');
              } else {
                navigate('/profile', { state: email });
              }
            }
          })
          .catch((err) => console.log(err));
        console.log('User logged in successfully!');
      } catch (error) {
        console.error('Error logging in:', error);
        alert("Incorrect username or password.")
      }
    }
  };

  return (
    <React.Fragment>
      <div className="loginForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <Button variant="outlined" color="secondary" type="submit">
            Sign In
          </Button>

          <small className="marginLeft">
            Need an account <Link to="/register">Sign Up</Link>
          </small>
        </form>
        <small>
          <Link to="/forgotPassword">Forgot Password?</Link>
        </small>
        <br />
      </div>
    </React.Fragment>
  );
};

export default Login;
