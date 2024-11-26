import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert } from '@mui/material';

function Patient() {
  const userId = localStorage.getItem("id"); // This is the user ID, not patient ID
  const [patientInfo, setPatientInfo] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch patient information on component mount
  useEffect(() => {
    console.log(userId);
    // First, fetch patient information using userId
    fetch(`http://localhost:8081/patientinfo/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Assuming patient data is returned as JSON
      })
      .then(data => {
        setPatientInfo(data); // Save patient info to state
      })
      .catch(error => {
        console.error('Error fetching patient info:', error);
        setErrorMessage("Error fetching patient information.");
      });
  }, [userId]);

  // Fetch conditions when patientInfo is available
  useEffect(() => {
    if (patientInfo && patientInfo.id) {
        const patientId =patientInfo.id;
      fetch(`http://localhost:8081/conditions/patient/${patientId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // Assuming conditions data is returned as JSON
        })
        .then(data => {
          setConditions(data); // Save conditions to state
        })
        .catch(error => {
          console.error('Error fetching conditions:', error);
          setErrorMessage("Error fetching patient conditions.");
        });
    }
  }, [patientInfo]);

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Patient Information
      </Typography>

      {errorMessage && (
        <Alert severity="error" style={{ marginTop: '1rem' }}>{errorMessage}</Alert>
      )}

      {patientInfo ? (
        <Box mt={2}>
          <Typography><strong>First Name:</strong> {patientInfo.firstName}</Typography>
          <Typography><strong>Last Name:</strong> {patientInfo.lastName}</Typography>
          <Typography><strong>Age:</strong> {patientInfo.age}</Typography>
          <Typography><strong>Gender:</strong> {patientInfo.gender}</Typography>

          <Typography variant="h6" mt={3}>Conditions:</Typography>
          {conditions.length > 0 ? (
            conditions.map((condition, index) => (
              <Box key={index} mt={1} p={1} border="1px solid #ddd">
                <Typography><strong>Name:</strong> {condition.name}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No conditions found for this patient.</Typography>
          )}
        </Box>
      ) : (
        <Typography>Loading patient information...</Typography>
      )}
    </Box>
  );
}

export default Patient;
