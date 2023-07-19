import React, { useState, useEffect } from 'react';
import LoginForm from './Login';
import RegisterForm from './Register';
import UserTable from './UserTable';
import { Container, Typography, Box, Button } from '@mui/material';

const Dashboard = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn]);

  const handleLogin = (email, password) => {
    // Make a POST request to the backend to authenticate the user and obtain a JWT token
    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { token } = data;
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRegister = (email, password, mobileNumber,confirmPassword) => {
    
    fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, mobileNumber, confirmPassword }),
    })
      .then((response) => {
        if (response.status === 201) {
          setIsLoginForm(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const fetchUserDetails = () => {
    
    fetch('http://localhost:3001/api/user-details', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        {isLoggedIn ? (
          <>
            <Typography variant="h4">User Details</Typography>
            <UserTable users={users} />
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            {isLoginForm ? (
              <>
                <Typography variant="h4">Login</Typography>
                <LoginForm handleLogin={handleLogin} toggleForm={toggleForm} />
              </>
            ) : (
              <>
                <Typography variant="h4">Register</Typography>
                {/* <RegisterForm handleRegister={handleRegister} toggleForm={toggleForm} /> */}
                <RegisterForm isLoginForm={isLoginForm} handleRegister={handleRegister} toggleForm={toggleForm} />

              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
