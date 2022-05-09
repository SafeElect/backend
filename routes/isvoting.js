const express = require('express');
const { sendError, sendResponse, pool } = require('../helper');


const router = express.Router();
let votingState = 1;
router.get('/isvoting', (_, res) => {
    sendResponse(res, 200, ""+votingState);
    
});
router.get('/isvoting/end', (_, res) => {
    votingState = 0;
    sendResponse(res, 200, "voting ended");

});
router.get('/isvoting/start', (_, res) => {
    votingState = 1;
    sendResponse(res, 200, "voting started");

});

module.exports = router;