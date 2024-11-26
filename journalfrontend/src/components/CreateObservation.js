import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

function CreateObservation() {
  const [patientUsername, setPatientUsername] = useState('');
  const [observationContent, setObservationContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const observationDto = {
      patient: patientUsername,
      practitioner: localStorage.getItem("username"), // Assuming practitioner username is stored in local storage
      description: observationContent,
      timeOfObservation: new Date().toISOString(), // Current timestamp
    };

    fetch('http://localhost:8081/CreateObservation', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(observationDto),
    })
      .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        console.log('Observation created:', data);
        setMessage("Observation created successfully!");
        setPatientUsername('');
        setObservationContent('');
      })
      .catch(error => {
        console.error('Error creating observation:', error);
        setMessage("Error creating observation.");
      });
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Create Observation
      </Typography>
      {message && (
        <Alert severity={message.includes("Error") ? "error" : "success"}>
          {message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Patient Username"
          variant="outlined"
          fullWidth
          value={patientUsername}
          onChange={(e) => setPatientUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Observation Content"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={observationContent}
          onChange={(e) => setObservationContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Observation
        </Button>
      </form>
    </Box>
  );
}

export default CreateObservation;