const express = require('express');
const { sendError, sendResponse, pool } = require('../helper');

const router = express.Router();
async function fetchTeams() {
  let team = [];
  for(let i = 0;i<13;i++)
  {
    let x = i+1;
    let response = await fetch('http://localhost:8080/smob/Team '+x);
    team[i] = await response.json();
  }
  
  // waits until the request completes...
  return(team);
}

router.get('/smob', async (_, res) => {
    const connection = pool;
    query = 'SELECT *, voteCount * 100 / (SELECT SUM(voteCount) as vc FROM candidate) as `percentage` FROM candidate ORDER BY votecount desc';
    let x = await fetchTeams();
    connection.query(query, (err, results) => {
        if (err) {
            sendError(res, 400, err.sqlMessage);
            return;
        }
        let returningValues = [...results];
        sendResponse(res, 200, {returningValues,x});
    });
});

router.get('/smob/:votedfor', (req, res) => {
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
        console.log(returningValues.length);
        let female = returningValues.filter(value => value.gender == 'Female').length;
        let male = returningValues.filter(value => value.gender == 'Male').length;
        let sum = male + female;
        let malep = male/sum*100;
        let femalep = female/sum*100;
        //18-30 31-50 51-60 61+
        let et = 0;
        let tf = 0;
        let fs = 0;
        let sp = 0;
        returningValues.forEach(e => {
            if(e.age < 30 && e.age > 18)
            {
              et++;
            }
            else if(e.age < 50 && e.age > 31)
            {
              tf++;
            }
            else if(e.age < 60 && e.age > 51)
            {
              fs++;
            }
            else
            {
              sp++;
            }
        });
        // let avgAge = ageSum/returningValues.length;
        let precentages = {male: malep, female: femalep};
        let uniqueCities = [...new Set( returningValues.map(obj => obj.bcity)) ];
        let cities={};
        uniqueCities.forEach(el => {
            cities[el]=(returningValues.filter(value => value.bcity == el).length/returningValues.length*100);
        });
        let cityKey = Object.keys(cities);
        let cityVal = Object.values(cities);

        if(cityKey.length < 3)
        {
          if(!cityKey.includes("ANKARA"))
          {
            cityKey.push("ANKARA")
            cityVal.push(0);
          }
          if(!cityKey.includes("İSTANBUL"))
          {
            cityKey.push("İSTANBUL")
            cityVal.push(0);
          }
          if(!cityKey.includes("İZMİR"))
          {
            cityKey.push("İZMİR")
            cityVal.push(0);
          }
        }

        sendResponse(res, 200, {genderPercentages: malep, age: [et,tf,fs,sp], location: cityKey, locationPercentage: cityVal});
      }
      else {
        sendError(res, 400, 'no stats');
      }
    });
  });

module.exports = router;