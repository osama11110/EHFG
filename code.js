import express from 'express';
import fetch from 'node-fetch';
import https from 'https';

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory (including index.html)
app.use(express.static('public'));

// Disable SSL validation for development purposes (ONLY USE IN DEV)
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

// Middleware to manually add CORS headers
app.use((req, res, next) => {
    // Set the Access-Control-Allow-Origin header to allow requests from all origins
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Set headers to handle preflight requests (OPTIONS method)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests (OPTIONS method)
    if (req.method === 'OPTIONS') {
        // Send a response for OPTIONS preflight requests
        return res.sendStatus(200);
    }

    // Move on to the next middleware or route handler
    next();
});

// Route to fetch events from external API
app.get('/get-events', async (req, res) => {
    const eventURL = 'https://ehfg.org/programme.json?year=2024';

    try {
        const response = await fetch(eventURL, { agent: httpsAgent });
        const data = await response.json();
        res.json(data); // Send the fetched data as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
