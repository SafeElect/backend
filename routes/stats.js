const express = require('express');
const { sendError, sendResponse, pool } = require('../helper');

const router = express.Router();

router.post('/addstat', (req, res) => {
    const connection = pool;
    const post = req.body;
    const query = 'INSERT INTO stats SET ?';
    connection.query(query, post, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        const returningValues = { id: results.insertId, ...post };
        delete returningValues.nid;
        sendResponse(res, 201, returningValues);
    });
});

router.get('/stats', (_, res) => {
    const connection = pool;
    const query = 'SELECT * FROM stats';
    connection.query(query, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        let returningValues = [...results];
        sendResponse(res, 200, returningValues);
    });
});

router.get('/stats/a/:area', (req, res) => {
    const connection = pool;
    const area = req.params.area;
    const query = 'SELECT * FROM stats WHERE area = ?';
    connection.query(query, area, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        if (results.length > 0) {
            const returningValues = [...results];
            const query2 = "SELECT count(area) from stats where area = ?";
            connection.query(query2, area, (err2, results2) => {
                const returningValues2 = [...results2][0];
                if (err2) {
                    sendError(res, 400, err.sqlMessage);
                    return;
                }
                sendResponse(res, 200, [returningValues, returningValues2]);
            });

        } else {
            sendError(res, 400, 'there is no voter from this area!');
        }
    });
});

router.get('/stats/g/:gender', (req, res) => {
    const connection = pool;
    const gender = req.params.gender;
    const query = 'SELECT * FROM stats WHERE gender = ?';
    connection.query(query, gender, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        if (results.length > 0) {
            const returningValues = [...results];
            const query2 = "SELECT count(gender) from stats where gender = ?";
            connection.query(query2, gender, (err2, results2) => {
                const returningValues2 = [...results2][0];
                if (err2) {
                    sendError(res, 400, err.sqlMessage);
                    return;
                }
                sendResponse(res, 200, [returningValues, returningValues2]);
            });

        } else {
            sendError(res, 400, 'not a valid gender or no candidate with this gender!');
        }
    });
});

router.get('/stats/bc/:bcity', (req, res) => {
    const connection = pool;
    const bcity = req.params.bcity;
    const query = 'SELECT * FROM stats WHERE bcity = ?';
    connection.query(query, bcity, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        if (results.length > 0) {
            const returningValues = [...results];
            const query2 = "SELECT count(bcity) from stats where bcity = ?";
            connection.query(query2, bcity, (err2, results2) => {
                const returningValues2 = [...results2][0];
                if (err2) {
                    sendError(res, 400, err.sqlMessage);
                    return;
                }
                sendResponse(res, 200, [returningValues, returningValues2]);
            });

        } else {
            sendError(res, 400, 'there is no voter born in this city!');
        }
    });
});

router.get('/stats/age/:start/:end', (req, res) => {
    const connection = pool;
    const start = req.params.start;
    const end = req.params.end;
    const query = 'SELECT * FROM stats WHERE age > ?';
    connection.query(query, start, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        if (results.length > 0) {
            const returningValues = [...results];
            const returnThis = returningValues.filter((el) => {
                return el.age < end;
            });
            console.log(returningValues[0]);
            sendResponse(res, 200, [returnThis, { count: returnThis.length }]);

        } else {
            sendError(res, 400, 'there is no voter whose age is in this range!');
        }
    });
});

router.get('/stats/v/:votedfor', (req, res) => {
    const connection = pool;
    const votedfor = req.params.votedfor;
    const query = 'SELECT * FROM stats WHERE votedFor = ?';
    connection.query(query, votedfor, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        if (results.length > 0) {
            const returningValues = [...results];
            const query2 = "SELECT count(votedfor) from stats where votedfor = ?";
            connection.query(query2, votedfor, (err2, results2) => {
                const returningValues2 = [...results2][0];
                if (err2) {
                    sendError(res, 400, err.sqlMessage);
                    return;
                }
                sendResponse(res, 200, [returningValues, returningValues2]);
            });

        } else {
            sendError(res, 400, 'not a valid candidate!');
        }
    });
});

router.get('/stats/av/:area/:votedfor', (req, res) => {
    const connection = pool;
    const votedfor = req.params.votedfor;
    const area = req.params.area;
    const query = 'SELECT * FROM stats WHERE votedFor = ?';
    connection.query(query, votedfor, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        if (results.length > 0) {
            const returningValues = [...results];
            const returnThis = returningValues.filter((el) => {
                return el.area.toLocaleUpperCase('tr-TR') == area.toLocaleUpperCase('tr-TR');
            });
            sendResponse(res, 200, [returnThis, { count: returnThis.length }]);

        } else {
            sendError(res, 400, 'not a valid candidate!');
        }
    });
});

router.get('/stats/gv/:gender/:votedfor', (req, res) => {
    const connection = pool;
    const votedfor = req.params.votedfor;
    const gender = req.params.gender;
    const query = 'SELECT * FROM stats WHERE votedFor = ?';
    connection.query(query, votedfor, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        if (results.length > 0) {
            const returningValues = [...results];
            const returnThis = returningValues.filter((el) => {
                return el.gender.toLocaleUpperCase('tr-TR') == gender.toLocaleUpperCase('tr-TR');
            });
            sendResponse(res, 200, [returnThis, { count: returnThis.length }]);

        } else {
            sendError(res, 400, 'not a valid candidate!');
        }
    });
});

router.get('/stats/agev/:start/:end/:votedfor', (req, res) => {
    const connection = pool;
    const votedfor = req.params.votedfor;
    const start = req.params.start;
    const end = req.params.end;
    const query = 'SELECT * FROM stats WHERE votedFor = ?';
    connection.query(query, votedfor, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        if (results.length > 0) {
            const returningValues = [...results];
            const returnThis = returningValues.filter((el) => {
                return el.age > start && el.age < end;
            });
            sendResponse(res, 200, [returnThis, { count: returnThis.length }]);

        } else {
            sendError(res, 400, 'not a valid candidate!');
        }
    });
});

router.get('/stats/bcv/:bcity/:votedfor', (req, res) => {
    const connection = pool;
    const votedfor = req.params.votedfor;
    const bcity = req.params.bcity;
    const query = 'SELECT * FROM stats WHERE votedFor = ?';
    connection.query(query, votedfor, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        if (results.length > 0) {
            const returningValues = [...results];
            const returnThis = returningValues.filter((el) => {
                return el.bcity.toLocaleUpperCase('tr-TR') == bcity.toLocaleUpperCase('tr-TR');
            });
            sendResponse(res, 200, [returnThis, { count: returnThis.length }]);

        } else {
            sendError(res, 400, 'not a valid candidate!');
        }
    });
});

module.exports = router;