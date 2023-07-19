

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import '../styles/flip.css';
const LoginForm = ({ isLoginForm, handleLogin, toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className={`flip-form ${isLoginForm ? 'login-form' : 'register-form'}`}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Button variant="text" onClick={toggleForm} fullWidth>
          Register
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
