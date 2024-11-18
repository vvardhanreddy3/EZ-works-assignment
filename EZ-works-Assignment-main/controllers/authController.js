const jwt = require('jsonwebtoken');
const db = require('../db');

const login = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0 || results[0].password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: results[0].id, role: results[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
};

const signup = (req, res) => {
    const { username, email, password } = req.body;
    const role = 'client';
    db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role], (err, result) => {
        if (err) return res.status(400).json({ message: 'Signup failed' });
        const encryptedUrl = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET);
        res.json({ message: 'Signup successful', url: encryptedUrl });
    });
};

const verifyEmail = (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: 'Email verified', userId: decoded.id });
    } catch {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = { login, signup, verifyEmail };
