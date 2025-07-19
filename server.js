const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Database file path
const DB_FILE = 'messages.json';

// Initialize database if it doesn't exist
async function initializeDB() {
    try {
        await fs.access(DB_FILE);
    } catch (error) {
        // File doesn't exist, create it with empty array
        await fs.writeFile(DB_FILE, JSON.stringify([], null, 2));
    }
}

// Read messages from database
async function readMessages() {
    try {
        const data = await fs.readFile(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading messages:', error);
        return [];
    }
}

// Write messages to database
async function writeMessages(messages) {
    try {
        await fs.writeFile(DB_FILE, JSON.stringify(messages, null, 2));
    } catch (error) {
        console.error('Error writing messages:', error);
        throw error;
    }
}

// API Routes

// Get all messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await readMessages();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Submit new message
app.post('/api/messages', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        const newMessage = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
            read: false
        };
        
        const messages = await readMessages();
        messages.unshift(newMessage); // Add to beginning
        await writeMessages(messages);
        
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!',
            data: newMessage 
        });
        
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// Mark message as read
app.put('/api/messages/:id/read', async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await readMessages();
        
        const messageIndex = messages.findIndex(msg => msg.id === id);
        if (messageIndex === -1) {
            return res.status(404).json({ error: 'Message not found' });
        }
        
        messages[messageIndex].read = true;
        await writeMessages(messages);
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update message' });
    }
});

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await readMessages();
        
        const filteredMessages = messages.filter(msg => msg.id !== id);
        await writeMessages(filteredMessages);
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

// Export messages to CSV
app.get('/api/export/csv', async (req, res) => {
    try {
        const messages = await readMessages();
        
        let csv = 'ID,Name,Email,Subject,Message,Timestamp,Read\n';
        messages.forEach(msg => {
            const row = [
                msg.id,
                `"${msg.name.replace(/"/g, '""')}"`,
                msg.email,
                `"${msg.subject.replace(/"/g, '""')}"`,
                `"${msg.message.replace(/"/g, '""')}"`,
                msg.timestamp,
                msg.read ? 'Yes' : 'No'
            ].join(',');
            csv += row + '\n';
        });
        
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="contact_messages.csv"');
        res.setHeader('Cache-Control', 'no-cache');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: 'Failed to export messages' });
    }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Initialize database and start server
initializeDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📊 Dashboard available at http://localhost:${PORT}/dashboard`);
        console.log(`📧 API endpoints:`);
        console.log(`   GET  /api/messages - Get all messages`);
        console.log(`   POST /api/messages - Submit new message`);
        console.log(`   PUT  /api/messages/:id/read - Mark as read`);
        console.log(`   DELETE /api/messages/:id - Delete message`);
        console.log(`   GET  /api/export/csv - Export to CSV`);
    });
}).catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
}); 