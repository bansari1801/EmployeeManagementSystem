import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from './navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

export default function Home() {
  const [employees, setEmployees] = React.useState([]);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_API_GATEWAY_URL;

  const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_APP_CLIENT_ID,
  };

  const userPool = new CognitoUserPool(poolData);

  const fetchAllEmployees = () => {
    const requestOptions = {
      method: 'GET',
      headers: { Accept: 'application/json' },
    };
    fetch(`${backendUrl}/getAllEmployees`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  React.useEffect(() => {
    fetchAllEmployees();
  }, []);

  const deleteEmployee = async (email) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
      body: JSON.stringify({ email: email }),
    };

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.deleteUser(function (err, result) {
      if (err) {
        console.log(err);
        alert('Error deleting user!');
        return;
      }
      fetch(`${backendUrl}/deleteEmployee`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          fetchAllEmployees();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    });
  };

  const editEmployee = (email) => {
    navigate('/editProfile', { state: email });
  };

  return (
    <div>
      <Navbar />
      <TableContainer component={Paper} className="tableContainer">
        <h1 className="header">Employees</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow key={row.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon onClick={() => editEmployee(row.email)} />
                  </IconButton>
                  <IconButton onClick={() => deleteEmployee(row.email)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
