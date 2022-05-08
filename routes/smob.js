const express = require('express');
const { sendError, sendResponse, pool } = require('../helper');

const router = express.Router();

router.get('/smob', (_, res) => {
    const connection = pool;
    query = 'SELECT *, voteCount * 100 / (SELECT SUM(voteCount) as vc FROM candidate) as `percentage` FROM candidate ORDER BY votecount desc';
    connection.query(query, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        let returningValues = [...results];
        sendResponse(res, 200, returningValues);
    });
});

module.exports = router;