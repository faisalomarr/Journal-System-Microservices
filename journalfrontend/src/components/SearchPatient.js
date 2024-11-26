import React, { useState } from 'react';
import { Button, Box, Typography, Alert, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SearchPatient() {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8084/patiensQuarkus?name=${username}`, {
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
            
                localStorage.setItem("id",data)
                navigate("/patient");
        
        })
        .catch(error => {
            console.error('Error fetching user', error);
            setErrorMessage("Error fetching user.");
        });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Search for Patient</Typography>
            <Box component="form" onSubmit={handleSearch}>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
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

export default SearchPatient;
