const express = require('express');
const multer = require('multer');
const { postPredictData } = require('../controllers/predict.controller');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
});

router.post('/', upload.single('image'), postPredictData);

module.exports = router;