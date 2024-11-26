import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

function AddConditionpatientFhir() {
  const [name, setName] = useState(''); // Renamed to 'name' to match backend
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientId = localStorage.getItem("id"); // Retrieve patient ID from localStorage
    const form = { name, patientId }; // Updated to match ConditionDto fields

    fetch('http://localhost:8080/addconditionfhir', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Condition added:', data);
        setMessage("Condition added successfully!");
      })
      .catch(error => {
        console.error('Error adding condition:', error);
        setMessage("Error adding condition.");
      });
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Add Condition
      </Typography>
      {message && <Alert severity={message.includes("Error") ? "error" : "success"}>{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name of Condition"
          variant="outlined"
          fullWidth
          value={name} // Now matches 'name' for backend compatibility
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default AddConditionpatientFhir;
