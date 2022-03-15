const express = require('express');
const { sendError, sendResponse, pool } = require('../helper');
const fetch = require('cross-fetch');

const router = express.Router();

router.post('/addvoter', (req, res) => {
  const connection = pool;
  const post = req.body;
  const query = 'INSERT INTO voter SET ?';
  connection.query(query, post, (err, results) => {
    if (err) {
      sendError(res, 400, err.sqlMessage);
      return;
    }
    const returningValues = { id: results.insertId, ...post };
    delete returningValues.pass;
    sendResponse(res, 201, returningValues);
  });
});

router.post('/dbvoter', (req, res) => {
  const connection = pool;
  const post = req.body;
  console.log(post.url);

  fetch(post.url).then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  }).then(data => {


    const query = 'INSERT INTO voter VALUES ?';
    let values = [];

    data.data.forEach(element => {
      values.push([element.id,element.nid,element.first,element.last,element.mother_first,element.father_first,element.address,element.gender,element.bday,element.bcity,element.pass]);
    });
    connection.query(query, [values], (err, results) => {
      if (err) {
        sendError(res, 400, err.sqlMessage);
        return;
      }
      sendResponse(res, 201, "database transfer is completed!");
    });

    
  })
});


router.get('/voter', (_, res) => {
  const connection = pool;
  const query = 'SELECT * FROM voter';
  connection.query(query, (err, results) => {
    if (err) {
      sendError(res, 400, err.sqlMessage);
      return;
    }
    let returningValues = [...results];
    returningValues = returningValues.map(({ pass, ...val }) => val);
    sendResponse(res, 200, returningValues);
  });
});

router.get('/voter/:id', (req, res) => {
  const connection = pool;
  const id = req.params.id;
  const query = 'SELECT * FROM voter WHERE nid = ?';
  connection.query(query, id, (err, results) => {
    if (err) {
      sendError(res, 400, err.sqlMessage);
      return;
    }
    if (results.length > 0) {
      const returningValues = [...results][0];
      delete returningValues.pass;
      sendResponse(res, 200, returningValues);
    } else {
      sendError(res, 400, 'voter with provided id does not exist!');
    }
  });
});

module.exports = router;