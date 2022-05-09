const express = require('express');
const { sendError, sendResponse, pool } = require('../helper');
const fetch = require('cross-fetch');

const router = express.Router();

router.get('/isvoting', (req, res) => {
//   const connection = pool;
//   const query = 'SELECT * FROM voter WHERE nid = ?';
//   connection.query(query, id, (err, results) => {
//     if (err) {
//       sendError(res, 400, err.sqlMessage);
//       return;
//     }
//     if (results.length > 0) {
//       const returningValues = [...results][0];
//       // delete returningValues.pass;
//       sendResponse(res, 200, returningValues);
//     } else {
//       sendError(res, 400, 'voter with provided id does not exist!');
//     }
//   });
    const votingState = 1; // 0 = not voting, 1 = voting
    sendResponse(res, 200, votingState); // implement logic here, this doesnt work because I get 304 which leads to undefined
// NOT WORKING... SET IT UP WITH DB  AND WEB ADMIN PANEL

});

module.exports = router;