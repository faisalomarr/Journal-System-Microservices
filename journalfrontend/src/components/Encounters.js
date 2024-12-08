import React from 'react';
import { Button, Box, Typography, Alert, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function Encounters() {
  const location = useLocation();
  const { encounters } = location.state || { encounters: [] }; // Access encounters passed via navigate
  const navigate = useNavigate();

  const handleViewInfoEncounter = (encounter) => {
    navigate("/encounterInfo", { state: { encounter } }); // Pass encounter data to the next route
  };

  console.log("Encounters data received:", encounters);

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        All Encounters Today
      </Typography>
      {encounters.length > 0 ? (
        <List>
          {encounters.map((encounter, index) => (
            <ListItem key={index} divider sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary={`Type: ${encounter.encounterType}, Date: ${encounter.encounterDate}`}
                secondary={`Practitioner: ${encounter.practitioner?.firstname} ${encounter.practitioner?.lastname}`}
              />
              <ListItemSecondaryAction sx={{ right: 0 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewInfoEncounter(encounter)}
                    sx={{ mb: 1 }}
                  >
                    View Info
                  </Button>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography align="center">No encounters found.</Typography>
      )}
    </Box>
  );
}

export default Encounters;
