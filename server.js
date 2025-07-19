const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Excel file path
const excelFilePath = 'contact_submissions.xlsx';

// Initialize Excel file if it doesn't exist
function initializeExcelFile() {
    if (!fs.existsSync(excelFilePath)) {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact Submissions');
        XLSX.writeFile(workbook, excelFilePath);
    }
}

// Add contact submission to Excel
function addContactToExcel(contactData) {
    try {
        // Read existing data
        const workbook = XLSX.readFile(excelFilePath);
        const worksheet = workbook.Sheets['Contact Submissions'];
        const existingData = XLSX.utils.sheet_to_json(worksheet);
        
        // Add new data with timestamp
        const newEntry = {
            ...contactData,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };
        
        existingData.push(newEntry);
        
        // Write back to Excel
        const newWorksheet = XLSX.utils.json_to_sheet(existingData);
        workbook.Sheets['Contact Submissions'] = newWorksheet;
        XLSX.writeFile(workbook, excelFilePath);
        
        return true;
    } catch (error) {
        console.error('Error writing to Excel:', error);
        return false;
    }
}

// Routes
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please enter a valid email address' 
            });
        }
        
        // Save to Excel
        const contactData = { name, email, subject, message };
        const success = addContactToExcel(contactData);
        
        if (success) {
            res.json({ 
                success: true, 
                message: 'Thank you! Your message has been sent successfully.' 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Failed to save your message. Please try again.' 
            });
        }
        
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
});

// Download Excel file
app.get('/api/download-contacts', (req, res) => {
    try {
        if (fs.existsSync(excelFilePath)) {
            res.download(excelFilePath, 'contact_submissions.xlsx');
        } else {
            res.status(404).json({ message: 'No contact submissions found' });
        }
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ message: 'Error downloading file' });
    }
});

// Initialize Excel file on server start
initializeExcelFile();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Contact form submissions will be saved to: ${excelFilePath}`);
}); 
