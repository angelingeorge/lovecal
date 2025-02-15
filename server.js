// Import required modules
const express = require('express');
const cors = require('cors');

// Create an Express app
const app = express();

// Enable CORS to allow frontend to communicate with backend
app.use(cors());
app.use(express.json());

// Homepage Route (Fix for "Cannot GET /")
app.get('/', (req, res) => {
    res.send("Love Calculator Backend is Running! ❤️");
});

// Function to calculate love percentage
function calculateLove(name1, name2) {
    let combinedValue = 0;
    for (let char of name1.toLowerCase() + name2.toLowerCase()) {
        combinedValue += char.charCodeAt(0);
    }
    return combinedValue % 101; // Love percentage between 0-100
}

// API Endpoint for Love Calculation
app.post('/calculate', (req, res) => {
    const { name1, name2 } = req.body;

    // Check if both names are provided
    if (!name1 || !name2) {
        return res.status(400).json({ error: "Both names are required!" });
    }

    // Calculate love percentage
    const lovePercentage = calculateLove(name1, name2);

    // Send response as JSON
    res.json({ lovePercentage });
});

// Define the port number
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
