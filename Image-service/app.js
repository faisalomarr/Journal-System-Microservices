const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Enable CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the frontend URL in production
    optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Multer config for file uploads
const upload = multer({ dest: '/app/uploads/' });

// Serve static files (like index.html) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the database connection
db.getConnection((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Route to fetch all images for a specific patient
app.get('/api/patient/:patient_id/images', (req, res) => {
    const { patient_id } = req.params;

    const sql = `SELECT id, filename, upload_time FROM image WHERE patient_id = ?`;
    db.query(sql, [patient_id], (err, results) => {
        if (err) {
            console.error('Error querying images by patient:', err);
            return res.status(500).send('Error fetching images for the patient');
        }

        res.json(results);
    });
});

// Route to save a new image for a specific patient
app.post('/api/patient/:patient_id/save-image', upload.single('file'), (req, res) => {
    const { patient_id } = req.params;
    const file = req.file;

    if (!file || !patient_id) {
        return res.status(400).send('File or patient_id is missing');
    }

    const targetPath = path.join('/app/uploads', file.originalname);
    fs.renameSync(file.path, targetPath);

    const sql = `INSERT INTO image (filename, patient_id) VALUES (?, ?)`;
    db.query(sql, [file.originalname, patient_id], (err, result) => {
        if (err) {
            console.error('Error saving image for patient:', err);
            return res.status(500).send('Error saving image');
        }
        res.json({ message: 'Image saved successfully', image_id: result.insertId });
    });
});

// Route to fetch a single image by filename
app.get('/api/files/:filename', (req, res) => {
    const { filename } = req.params;

    const sql = `SELECT filename FROM image WHERE filename = ?`;
    db.query(sql, [filename], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Error fetching image from database');
        }

        if (results.length === 0) {
            return res.status(404).send('File not found in database');
        }

        const filePath = path.join('/app/uploads', results[0].filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).send('File not found on server');
        }

        res.sendFile(filePath);
    });
});

// Route to save edited image (Update an existing image)
app.post('/api/patient/:patient_id/edit-image', upload.single('file'), (req, res) => {
    const file = req.file;
    const { patient_id } = req.params;

    if (!file || !patient_id) {
        return res.status(400).send('File or patient_id is missing');
    }

    const targetPath = path.join('/app/uploads', file.originalname);
    fs.renameSync(file.path, targetPath);

    const sql = `UPDATE image SET filename = ?, upload_time = CURRENT_TIMESTAMP WHERE patient_id = ?`;
    db.query(sql, [file.originalname, patient_id], (err, result) => {
        if (err) {
            console.error('Error updating image in database:', err);
            return res.status(500).send('Error saving edited image');
        }
        res.json({ message: 'Edited image saved successfully' });
    });
});

// New route to add a new image and resolve patient ID from name
app.post('/api/add-image', upload.single('file'), (req, res) => {
    const file = req.file;
    const { patient_name } = req.body;

    if (!file || !patient_name) {
        return res.status(400).send('File or patient_name is missing');
    }

    try {
        // Query database to get patient_id from patient_name
        const sqlFindPatient = `SELECT id FROM patient WHERE first_name = ?`;
        db.query(sqlFindPatient, [patient_name], (err, results) => {
            if (err) {
                console.error('Error querying patient by name:', err);
                return res.status(500).send('Error resolving patient name');
            }

            if (results.length === 0) {
                return res.status(404).send('No patient found with the given name');
            }

            const patientId = results[0].id;

            // Save the uploaded file
            const targetPath = path.join('/app/uploads', file.originalname);
            fs.renameSync(file.path, targetPath);

            // Insert image record into the database
            const sqlInsertImage = `INSERT INTO image (filename, patient_id) VALUES (?, ?)`;
            db.query(sqlInsertImage, [file.originalname, patientId], (err, result) => {
                if (err) {
                    console.error('Error saving image:', err);
                    return res.status(500).send('Error saving image');
                }
                res.json({ message: 'Image uploaded successfully', image_id: result.insertId });
            });
        });
    } catch (error) {
        console.error('Error in /api/add-image route:', error);
        res.status(500).send('An error occurred while uploading the image');
    }
});

// Start server
const PORT = 8085;
app.listen(PORT, () => {
    console.log(`Image service running on port ${PORT}`);
});
