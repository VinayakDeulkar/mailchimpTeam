const express = require('express');
const { getSegment, createSegment } = require('../Controller/segmentController');
const router = express.Router();
router.get("/getSegment", getSegment);
router.post("/createSegment", createSegment);
module.exports = router