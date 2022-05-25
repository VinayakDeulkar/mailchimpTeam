const express = require('express');
const router = express.Router();
const { getTemplate, createTemplate } = require('../Controller/templateController');
router.get("/getTemplate", getTemplate);
router.post("/createTemplate", createTemplate);
module.exports = router