import React from 'react';
import { Button, Box, Typography, Alert, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function PatientsByName() {
  const location = useLocation();
  const { patients } = location.state || { patients: [] }; // Access patients passed via navigate
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleViewInformation = (patientId) => {
    localStorage.setItem("id", patientId);
    navigate("/patient");
  };

  const handleAddCondition = (patientId) => {
    localStorage.setItem("id", patientId);
    navigate("/addcondition");
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        All Patients
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {patients.length > 0 ? (
        <List>
          {patients.map((patient, index) => (
            <ListItem key={index} divider sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary={`${patient.firstname} ${patient.lastname}`}
                secondary={`Age: ${patient.age}`}
              />
              <ListItemSecondaryAction sx={{ right: 0 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewInformation(patient.userId)}
                    sx={{ mb: 1 }}
                  >
                    View Info
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddCondition(patient.id)}
                    color="primary"
                  >
                    Add Condition
                  </Button>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography align="center">No patients found.</Typography>
      )}
    </Box>
  );
}

export default PatientsByName;
