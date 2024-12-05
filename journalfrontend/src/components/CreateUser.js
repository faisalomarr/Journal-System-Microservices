import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography, Alert } from '@mui/material';
import { CREATE_USER_URL, CREATE_PATIENT_URL, CREATE_PRACTITIONER_URL } from '../config/apiConfig'; // Import endpoints

function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const createform = { username, password, role };

    fetch(CREATE_USER_URL, { // Use centralized URL for creating a user
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createform),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('User created:', data);
        setMessage("User created successfully!");

        if (role === 'PATIENT') {
          const userId = data.id;
          const patientform = { firstName, lastName, age, gender, userId };

          return fetch(CREATE_PATIENT_URL, { // Use centralized URL for creating patient details
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(patientform),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Patient details created:', data);
            setMessage("Patient details created successfully!");
          });
        } else if (role === 'PRACTITIONER') {
          const userId = data.id;
          const practitionerform = { firstName, lastName, jobTitle, userId };

          return fetch(CREATE_PRACTITIONER_URL, { // Use centralized URL for creating practitioner details
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(practitionerform),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Practitioner details created:', data);
            setMessage("Practitioner details created successfully!");
          });
        }
      })
      .catch(error => {
        console.error('Error creating user or role-specific details:', error);
        setMessage("Error creating user or role-specific details.");
      });
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Create User
      </Typography>
      {message && <Alert severity={message.includes("Error") ? "error" : "success"}>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="STAFF">Staff</MenuItem>
            <MenuItem value="PRACTITIONER">Practitioner</MenuItem>
            <MenuItem value="PATIENT">Patient</MenuItem>
          </Select>
        </FormControl>

        {role === 'PATIENT' && (
          <>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Age"
              type="number"
              variant="outlined"
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        {role === 'PRACTITIONER' && (
          <>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Job Title"
              variant="outlined"
              fullWidth
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        )}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create User
        </Button>
      </form>
    </Box>
  );
}

export default CreateUser;
