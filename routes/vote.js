const express = require('express');
const { sendError, sendResponse, pool } = require('../helper');

const router = express.Router();

router.post('/addcanditate', (req, res) => {
    const connection = pool;
    const post = req.body;
    const query = 'INSERT INTO candidate SET ?';
    connection.query(query, post, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        const returningValues = { id: results.insertId, ...post };
        sendResponse(res, 201, returningValues);
    });
});

router.get('/candidate', (_, res) => {
    const connection = pool;
    const query = 'SELECT * FROM candidate';
    connection.query(query, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        let returningValues = [...results];
        sendResponse(res, 200, returningValues);
    });
});

router.put("/candidate/:id", (req, res) => {
    const connection = pool;
    const id = req.params.id;
    const body = req.body;
    const query =
        "UPDATE candidate SET voteCount = voteCount+1 WHERE nid = ?";
    connection.query(
        query,
        [id],
            (err, results) => {
                if (err || results.affectedRows == 0) {
                    const msg = err ? err.sqlMessage : "id does not exist";
                    sendError(res, 400, msg);
                    return;
                }
                sendResponse(res, 200, body);
            }
    );
});


module.exports = router;