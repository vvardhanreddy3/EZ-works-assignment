const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const authorizeClient = (req, res, next) => {
    if (req.user.role !== 'client') return res.status(403).json({ message: 'Access denied' });
    next();
};

module.exports = { authenticate, authorizeClient };
