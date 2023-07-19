// import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';

// const RegisterForm = ({ handleRegister, toggleForm }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   const handleMobileNumberChange = (event) => {
//     setMobileNumber(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handleRegister(email, password, mobileNumber, confirmPassword);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         label="Email"
//         variant="outlined"
//         type="email"
//         value={email}
//         onChange={handleEmailChange}
//       />
//       <TextField
//         label="Password"
//         variant="outlined"
//         type="password"
//         value={password}
//         onChange={handlePasswordChange}
//       />
//       <TextField
//         label="Re-enter Password"
//         variant="outlined"
//         type="password"
//         value={confirmPassword}
//         onChange={handleConfirmPasswordChange}
//       />
//       <TextField
//         label="Mobile Number"
//         variant="outlined"
//         type="tel"
//         value={mobileNumber}
//         onChange={handleMobileNumberChange}
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Register
//       </Button>
//       <Button variant="text" onClick={toggleForm}>
//         Login
//       </Button>
//     </form>
//   );
// };

// export default RegisterForm;

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import '../styles/flip.css';

const RegisterForm = ({ isLoginForm,handleRegister, toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister(email, password, mobileNumber, confirmPassword);
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
        <TextField
          label="Re-enter Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
        />
        <TextField
          label="Mobile Number"
          variant="outlined"
          type="tel"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
        <Button variant="text" onClick={toggleForm} fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
