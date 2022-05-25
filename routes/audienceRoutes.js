const express = require('express');
const router = express.Router();
const { GET_ADUIENCE, CREATE_AUDIENCE, ADD_MEMBER, GET_MEMBER, DELETE_ADUIENCE, DELETE_MEMBER, GET_GROETHHISTORY, GET_LOCATION } = require('../Controller/audienceController');


router.get('/getaudience', GET_ADUIENCE);
router.post('/add/member', ADD_MEMBER);
router.post('/get/member', GET_MEMBER);
router.delete('/delete/member', DELETE_MEMBER);
router.post('/create', CREATE_AUDIENCE);
router.post('/deleteaudience', DELETE_ADUIENCE);
router.get('/listGrowthHistoryData', GET_GROETHHISTORY);
router.get('/getLocations', GET_LOCATION)

module.exports = router