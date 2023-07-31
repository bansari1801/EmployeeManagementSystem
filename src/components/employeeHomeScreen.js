import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar';

const EmployeeHomeScreen = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const location = useLocation();

  const backendUrl = process.env.REACT_APP_API_GATEWAY_URL;

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: JSON.stringify({ email: location.state }),
    };
    fetch(`${backendUrl}/getEmployeeDetails`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmail(data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDepartment(data.department);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstNameError(false);
    setLastNameError(false);
    setDepartmentError(false);

    if (firstName == '') {
      setFirstNameError(true);
    }
    if (lastName == '') {
      setLastNameError(true);
    }
    if (department == '') {
      setDepartmentError(true);
    }

    if (email && firstName && lastName && department) {
      const requestOptions = {
        method: 'PUT',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({ email: email, firstName: firstName, lastName: lastName, department: department }),
      };

      fetch(`${backendUrl}/updateEmployee`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="loginForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Employee Profile</h2>
          <TextField label="Email" variant="outlined" color="secondary" type="email" sx={{ mb: 3 }} fullWidth value={email} disabled />
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
          <Button variant="outlined" color="secondary" type="submit">
            Update
          </Button>{' '}
        </form>
      </div>
    </React.Fragment>
  );
};

export default EmployeeHomeScreen;
