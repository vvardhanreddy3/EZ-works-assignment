const express = require('express');
const { uploadFile, listFiles, downloadFile } = require('../controllers/fileController');
const { authenticate, authorizeClient } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/upload', authenticate, upload, uploadFile);
router.get('/list', authenticate, authorizeClient, listFiles);
router.get('/download/:id', authenticate, authorizeClient, downloadFile);

module.exports = router;
