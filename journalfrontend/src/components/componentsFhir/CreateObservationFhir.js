import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

function CreateObservationFhir() {
  const [observationContent, setObservationContent] = useState('');
  const [message, setMessage] = useState('');
  const patientId = localStorage.getItem("id");

  const handleSubmit = (e) => {
    e.preventDefault();

    const observationDto = {
      patientId,
      description: observationContent,
      timeOfObservation: new Date().toISOString(), // Current timestamp
    };

    fetch('http://localhost:8080/addobservationfhir', {
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

export default CreateObservationFhir;