const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.pptx', '.docx', '.xlsx'];
    if (!allowedTypes.includes(path.extname(file.originalname))) return cb(new Error('Only pptx, docx, and xlsx files are allowed'));
    cb(null, true);
};

const upload = multer({ storage, fileFilter }).single('file');

module.exports = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ message: err.message });
        next();
    });
};
