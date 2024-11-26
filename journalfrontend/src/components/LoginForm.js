import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const loginform = {username,password}
    console.log(loginform);
    fetch('http://localhost:8082/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginform),
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse JSON if login is successful
        } else {
            throw new Error("Login failed"); // Handle failed login
        }
    })
    .then(data => {
        console.log("Login successful:", data);
        navigate("/welcome")
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("role", data.role); // Assuming `data` includes role info
        localStorage.setItem("id", data.id);


    })
    .catch(error => {
        console.error("Error:", error);
        alert("Login failed");
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
    
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </Box>
  );
}
