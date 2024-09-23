import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Required to handle __dirname in ES modules
import cors from 'cors';

const app = express();
const PORT = 3000;

// Create __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory (including index.html)
app.use(cors());
app.use(express.static('public'));

// Route to fetch events from the local JSON file
app.get('/get-events', (req, res) => {
    const eventFilePath = path.join(__dirname, 'programme.json'); // Path to the JSON file

    try {
        // Read the JSON file asynchronously
        fs.readFile(eventFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading events file', error: err });
            }
            
            // Parse the JSON data
            const events = JSON.parse(data);
            
            // Send the events data as a JSON response
            res.json(events);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
