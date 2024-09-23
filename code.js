import express from 'express';
import fetch from 'node-fetch';
import https from 'https';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory (including index.html)
app.use(cors());
app.use(express.static('public'));

// Disable SSL validation for development purposes (ONLY USE IN DEV)
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
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
    console.log(`Server is running on ${PORT}`);
});
