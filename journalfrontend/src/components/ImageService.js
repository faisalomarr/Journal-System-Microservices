import React, { useRef, useState } from 'react';
import PatientSelector from './PatientSelector';


export default function ImageManagement() {
    const canvasRef = useRef(null);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [images, setImages] = useState([]); // Store the list of images for the patient
    const [selectedImage, setSelectedImage] = useState(""); // Selected image filename
    const [message, setMessage] = useState("");
    const [isDrawing, setIsDrawing] = useState(false); // For drawing functionality
    const [isAddingText, setIsAddingText] = useState(false); // Toggle for adding text
    const [text, setText] = useState(""); // Text to add


    const backendUrl = "http://localhost:8085"; // Update for production if needed


    // Fetch images for the selected patient
    const fetchImagesForPatient = async (patientId) => {
        try {
            const response = await fetch(`${backendUrl}/api/patient/${patientId}/images`);
            if (response.ok) {
                const data = await response.json();
                setImages(data); // Update the images list
                setMessage(`Found ${data.length} images for patient ${patientId}`);
            } else {
                setImages([]);
                setMessage("No images found for the selected patient.");
            }
        } catch (error) {
            console.error("Error fetching images:", error);
            setMessage("An error occurred while fetching images.");
        }
    };


    // Load selected image onto the canvas
    const handleLoadImage = async () => {
        if (!selectedImage) {
            alert("Please select an image first.");
            return;
        }


        try {
            const response = await fetch(`${backendUrl}/api/files/${selectedImage}`);
            if (response.ok) {
                const img = new Image();
                img.src = URL.createObjectURL(await response.blob());
                img.onload = () => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    setMessage("Image loaded successfully!");
                };
            } else {
                setMessage("Image not found.");
            }
        } catch (error) {
            console.error("Error loading image:", error);
            setMessage("An error occurred while loading the image.");
        }
    };


    // Save the edited image
    const handleSaveImage = async () => {
        if (!selectedPatientId) {
            alert("Please select a patient first.");
            return;
        }


        const canvas = canvasRef.current;
        canvas.toBlob(async (blob) => {
            if (!blob) {
                setMessage("Failed to generate image.");
                return;
            }


            const filename = `edited-${Date.now()}.png`;
            const formData = new FormData();
            formData.append("file", blob, filename);
            formData.append("patient_id", selectedPatientId);


            try {
                const response = await fetch(`${backendUrl}/api/patient/${selectedPatientId}/save-image`, {
                    method: "POST",
                    body: formData,
                });


                if (response.ok) {
                    const result = await response.json();
                    setMessage(`Edited image saved successfully: ${result.image_id}`);
                } else {
                    setMessage("Failed to save the edited image.");
                }
            } catch (error) {
                console.error("Error saving image:", error);
                setMessage("An error occurred while saving the image.");
            }
        });
    };


    // Upload a new image
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            setMessage("No file selected.");
            return;
        }


        const patientName = prompt("Enter the name of the patient for this image:");
        if (!patientName) {
            alert("Patient name is required.");
            return;
        }


        const formData = new FormData();
        formData.append("file", file);
        formData.append("patient_name", patientName);


        try {
            const response = await fetch(`${backendUrl}/api/add-image`, {
                method: "POST",
                body: formData,
            });


            if (response.ok) {
                const result = await response.json();
                setMessage(`Image uploaded successfully for patient: ${patientName}`);
            } else {
                setMessage("Failed to upload the image.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setMessage("An error occurred while uploading the image.");
        }
    };


    // Add text to the canvas
    const handleAddText = () => {
        if (!text.trim()) {
            alert("Please enter text to add.");
            return;
        }
        setIsAddingText(true);
        setMessage("Click on the canvas to place the text.");
    };


    const addTextToCanvas = (e) => {
        if (!isAddingText) return;


        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");


        const x = e.nativeEvent.offsetX; // X-coordinate of the click
        const y = e.nativeEvent.offsetY; // Y-coordinate of the click


        ctx.font = "20px Arial"; // Font style and size
        ctx.fillStyle = "black"; // Text color
        ctx.fillText(text, x, y); // Draw text at the clicked position


        setIsAddingText(false);
        setText(""); // Clear text input
        setMessage("Text added to the canvas.");
    };


    // Clear the canvas
    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setMessage("Canvas cleared.");
    };


    // Handle patient selection
    const handlePatientSelect = (patientId) => {
        setSelectedPatientId(patientId);
        fetchImagesForPatient(patientId); // Fetch images when a patient is selected
    };


    // Drawing functionality
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        setIsDrawing(true);
    };


    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    };


    const stopDrawing = () => {
        setIsDrawing(false);
    };


    return (
        <div>
            <h1>Image Management</h1>
            <PatientSelector onSelectPatient={handlePatientSelect} />
            {message && <p>{message}</p>}


            {/* Image selection dropdown */}
            {images.length > 0 && (
                <div>
                    <h2>Select an Image</h2>
                    <select
                        value={selectedImage}
                        onChange={(e) => setSelectedImage(e.target.value)}
                    >
                        <option value="">-- Select an Image --</option>
                        {images.map((image) => (
                            <option key={image.id} value={image.filename}>
                                {image.filename} (Uploaded: {new Date(image.upload_time).toLocaleString()})
                            </option>
                        ))}
                    </select>
                </div>
            )}


            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{ border: "1px solid black" }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onClick={addTextToCanvas} // Add text functionality
            />
            <br />
            <input
                type="text"
                value={text}
                placeholder="Enter text to add"
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleAddText}>Add Text</button>
            <br />
            <button onClick={handleLoadImage}>Load Image</button>
            <button onClick={handleSaveImage}>Save Edited Image</button>
            <button onClick={handleClearCanvas}>Clear Canvas</button>
            <br />
            <input type="file" onChange={handleUploadImage} />
        </div>
    );
}
