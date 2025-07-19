# Khwahish Singh - Portfolio 

A modern, neon-themed portfolio website showcasing skills and projects.

## Features

### Portfolio Features
- 🎨 Modern neon-themed design
- 📱 Fully responsive
- ⚡ Smooth animations and transitions
- 🎯 Interactive sections (Home, About, Education, Skills, Projects, Certificates, Contact)
- ⌨️ Keyboard navigation (1-7 keys)
- 📄 CV download functionality

 📧 Contact form that opens email client
### Contact Form System
- 📧 **Message Storage**: All contact form submissions are stored in a JSON database
- 📊 **Dashboard**: Beautiful dashboard to view and manage all messages
- 🔍 **Search & Filter**: Search through messages and filter by read/unread status
- 📈 **Statistics**: Real-time statistics (total, unread, today's, this week's messages)
- 📤 **Export**: Export all messages to CSV format (can be opened in Excel)
- ✅ **Read/Unread**: Mark messages as read or unread
- 🗑️ **Delete**: Delete unwanted messages
- 🔄 **Auto-refresh**: Dashboard automatically refreshes every 30 seconds

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

### 3. Access Your Portfolio
- **Main Portfolio**: `http://localhost:3000`
- **Messages Dashboard**: `http://localhost:3000/dashboard`

## How It Works

### Contact Form Flow
1. **User submits form** → Data is sent to server
2. **Server validates** → Checks required fields and email format
3. **Data is stored** → Saved to `messages.json` file
4. **Email client opens** → As backup, user's email client opens with pre-filled message
5. **Success notification** → User gets confirmation

### Dashboard Features
- **View all messages** with sender details and timestamps
- **Search functionality** across name, email, subject, and message content
- **Filter messages** by read/unread status
- **Mark messages as read** with one click
- **Delete messages** with confirmation
- **Export to CSV** for Excel compatibility
- **Real-time statistics** showing message counts

## File Structure

```
project/
├── index.html              # Main portfolio page
├── styles.css              # Portfolio styles
├── script.js               # Portfolio JavaScript
├── server.js               # Node.js server for contact form
├── dashboard.html          # Messages dashboard
├── messages.json           # Database file (created automatically)
├── package.json            # Dependencies
└── README.md              # This file
```

## API Endpoints

- `GET /api/messages` - Get all messages
- `POST /api/messages` - Submit new message
- `PUT /api/messages/:id/read` - Mark message as read
- `DELETE /api/messages/:id` - Delete message
- `GET /api/export/csv` - Export messages to CSV

## Database Schema

Messages are stored in `messages.json` with the following structure:

```json
[
  {
    "id": "1703123456789",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Job Opportunity",
    "message": "Hello, I would like to discuss...",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "read": false
  }
]
```

## Export to Excel

1. **From Dashboard**: Click "Export to CSV" button
2. **Open in Excel**: 
   - Open Excel
   - Go to Data → From Text/CSV
   - Select the downloaded CSV file
   - Excel will automatically format the data in columns

## Customization

### Adding New Fields
To add new fields to the contact form:

1. **Update HTML**: Add new input fields in `index.html`
2. **Update Server**: Modify validation in `server.js`
3. **Update Dashboard**: Add new columns in `dashboard.html`

### Styling
- **Portfolio**: Edit `styles.css`
- **Dashboard**: Edit styles in `dashboard.html`

## Troubleshooting

### Server Won't Start
- Check if port 3000 is available
- Ensure all dependencies are installed: `npm install`

### Messages Not Saving
- Check server console for errors
- Ensure `messages.json` file is writable
- Verify form is sending data to correct endpoint

### Dashboard Not Loading
- Ensure server is running
- Check browser console for errors
- Verify API endpoints are accessible

## Security Notes

- This is a basic implementation for personal use
- For production, consider adding:
  - Rate limiting
  - Input sanitization
  - Authentication for dashboard
  - HTTPS
  - Database security

## Support

For issues or questions, check the console logs or contact the developer.

---

**Made with ❤️ by Khwahish Singh** 
