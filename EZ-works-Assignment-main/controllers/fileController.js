const db = require('../db');
const path = require('path');
const jwt = require('jsonwebtoken');

const uploadFile = (req, res) => {
    const { id } = req.user;
    const file = req.file;
    const filepath = path.join('uploads', file.filename);

    db.query('INSERT INTO files (filename, filepath, user_id) VALUES (?, ?, ?)', [file.originalname, filepath, id], (err) => {
        if (err) return res.status(500).json({ message: 'File upload failed' });
        res.json({ message: 'File uploaded successfully' });
    });
};

const listFiles = (req, res) => {
    db.query('SELECT * FROM files', (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to retrieve files' });
        res.json(results);
    });
};

const downloadFile = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM files WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'File not found' });
        const downloadLink = jwt.sign({ filepath: results[0].filepath }, process.env.JWT_SECRET, { expiresIn: '10m' });
        res.json({ downloadLink });
    });
};

module.exports = { uploadFile, listFiles, downloadFile };
