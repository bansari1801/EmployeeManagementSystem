import React, { useState } from 'react';
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const backendUrl = process.env.REACT_APP_API_GATEWAY_URL;

  const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_APP_CLIENT_ID,
  });

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setDepartmentError(false);

    if (email == '') {
      setEmailError(true);
    }
    if (password == '') {
      setPasswordError(true);
    }
    if (firstName == '') {
      setFirstNameError(true);
    }
    if (lastName == '') {
      setLastNameError(true);
    }
    if (department == '') {
      setDepartmentError(true);
    }

    if (email && password && firstName && lastName && department) {
      try {
        userPool.signUp(email, password, null, null, (err, result) => {
          if (err) {
            console.error('Error registering user:', err);
            alert('Error registering user!');
          }

          const requestOptions = {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName, department: department, isAdmin: isAdmin }),
          };

          fetch(`${backendUrl}/registerEmployee`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              alert('Registration Successful!!');
              navigate('/');
            })
            .catch((err) => console.log(err));
          console.log('User registered successfully!');
        });
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  };

  const handleCheckboxChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <React.Fragment>
      <div className="loginForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Register</h2>
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
          <TextField
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            sx={{ mb: 3 }}
            fullWidth
            value={firstName}
            error={firstNameError}
          />
          <TextField
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            sx={{ mb: 3 }}
            fullWidth
            value={lastName}
            error={lastNameError}
          />
          <TextField
            label="Department"
            onChange={(e) => setDepartment(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            sx={{ mb: 3 }}
            fullWidth
            value={department}
            error={departmentError}
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={isAdmin} onChange={handleCheckboxChange} />} label="isAdmin" />
          </FormGroup>
          <Button variant="outlined" color="secondary" type="submit">
            Register
          </Button>
        </form>
        <small>
          Back to <Link to="/">Sign In</Link>
        </small>
        <br />
      </div>
    </React.Fragment>
  );
};

export default Register;
