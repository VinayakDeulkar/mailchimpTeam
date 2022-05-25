const express = require('express');
const router = express.Router();
const { sendCampaign, createCampaign, getCampaign, addCampaignFeedback, getCampaignFeedback } = require('../Controller/campaignController');
router.post("/createCampaign", createCampaign);
router.post("/sendCampaign", sendCampaign);
router.get("/getCampaign", getCampaign);
router.post("/addCampaignFeedback", addCampaignFeedback);
router.get("/getCampaignFeedback", getCampaignFeedback);
module.exports = router