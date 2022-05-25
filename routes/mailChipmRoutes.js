const express = require("express");
const router = express.Router();
const {
  createAudience,
  addMemeber,
  getList,
  getListMembers,
  getSegment,
  createSegment,
  getTemplate,
  createTemplate,
  createCampaign,
  sendCampaign,
  getCampaign,
} = require("../Controllers/mailChimpController");

router.post("/createAudience", createAudience);
router.post("/addMemeber", addMemeber);
router.get("/getCampaign", getCampaign);
router.get("/getList", getList);
router.get("/getListMembers", getListMembers);
router.get("/getSegment", getSegment);
router.post("/createSegment", createSegment);
router.get("/getTemplate", getTemplate);
router.post("/createTemplate", createTemplate);
router.post("/createCampaign", createCampaign);
router.post("/sendCampaign", sendCampaign);
module.exports = router;
