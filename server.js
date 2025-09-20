// Import required packages
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

// In-memory array to store reports instead of a database.
let reports = [];
let reportIdCounter = 1;

// Initialize the Express app
const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- Multer Configuration for File Uploads ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });


// --- API Endpoints ---

// GET /api/reports - Retrieve all reports
app.get('/api/reports', (req, res) => {
    const sortedReports = reports.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    res.json(sortedReports);
});

// POST /api/report - Submit a new report
app.post('/api/report', upload.single('potholeImage'), (req, res) => {
    try {
        // --- CHANGE: Added reporterName and reportDate from the form ---
        const { location, description, severity, reporterName, reportDate } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'An image file is required.' });
        }

        const newReport = {
            id: reportIdCounter++,
            location,
            description,
            severity,
            reporterName, // Save the name
            reportDate,   // Save the date
            imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
            status: 'Reported',
            timestamp: new Date()
        };
        // --- END CHANGE ---

        reports.unshift(newReport);
        console.log('New report added by:', newReport.reporterName);
        res.status(201).json({ message: 'Report submitted successfully!', report: newReport });

    } catch (error) {
        console.error("Error submitting report:", error);
        res.status(500).json({ message: 'Server error during submission.' });
    }
});

// PATCH /api/reports/:id/status - Update the status of a specific report
app.patch('/api/reports/:id/status', (req, res) => {
    try {
        const reportId = parseInt(req.params.id, 10);
        const { status } = req.body;

        const reportToUpdate = reports.find(report => report.id === reportId);

        if (!reportToUpdate) {
            return res.status(404).json({ message: 'Report not found.' });
        }
        
        if (!['Reported', 'In Progress', 'Fixed'].includes(status)) {
             return res.status(400).json({ message: 'Invalid status value.' });
        }

        reportToUpdate.status = status;
        console.log(`Updated status of report ${reportId} to "${status}"`);
        res.json({ message: 'Status updated successfully!', report: reportToUpdate });

    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ message: 'Server error during status update.' });
    }
});


// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});