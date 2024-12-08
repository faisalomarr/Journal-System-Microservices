import React, { useState } from 'react';
import { Button, Box, Typography, Alert, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SearchEncounters() {
    const navigate = useNavigate();
    const [name, Setname] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
    
        console.log("Searching encounters for practitioner with name:", name); // Log the name
    
        fetch(`http://localhost:8084/encounterQuarkus/by-practitioner?name=${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log("--------------------------------");
            // Navigate to "/Encounters" with the data
            navigate("/Encounters", { state: { encounters: data } });
        })
        .catch(error => {
            console.error('Error fetching user', error);
            setErrorMessage("Error fetching user.");
        });
    };
    

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Search Encounters through practitioners</Typography>
            <Box component="form" onSubmit={handleSearch}>
                <TextField
                    label="name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => Setname(e.target.value)}
                    style={{ marginBottom: '1rem' }}
                />
                <Button variant="contained" type="submit">Search</Button>
            </Box>

            {errorMessage && (
                <Alert severity="error" style={{ marginTop: '1rem' }}>{errorMessage}</Alert>
            )}
        </Box>
    );
}

export default SearchEncounters;
