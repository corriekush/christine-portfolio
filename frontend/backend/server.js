const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve frontend files: backend is inside the `frontend` folder, so the parent
// directory of this backend folder is the actual frontend build/HTML directory.
app.use(express.static(path.join(__dirname, '..')));

// API Endpoint for Contact Form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newMessage = {
        id: Date.now(),
        date: new Date().toISOString(),
        name,
        email,
        message
    };

    const filePath = path.join(__dirname, 'messages.json');

    // Read existing messages or create an empty array
    let messages = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        messages = JSON.parse(fileData);
    }

    // Add new message and save
    messages.push(newMessage);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

    console.log(`New message received from ${name}`);
    res.status(200).json({ success: 'Message sent successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});