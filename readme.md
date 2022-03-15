USER MANUAL

VOTER -> 

/addvoter
---------
Add(insert) new VOTER

/dbvoter
---------
transfer the 3rd party database (post => "url" : "https://example.com")

/voter
---------
Get all voters

/voter/:id
---------
get voter by id








STATS ->

/addstat
---------
add a new stat

/stats
---------
get all stats

/stats/a/:area
---------
get stats by area

/stats/g/:gender
---------
get stats by gender

/stats/bc/:bcity
---------
get stats by birth city

/stats/age/:start/:end
---------
get stats between two ages

/stats/v/:votedfor
---------
get stats by candidate

/stats/av/:area/:votedfor
---------
get stats by area and candidate

/stats/gv/:gender/:votedfor
---------
get stats by gender and candidate

/stats/agev/:start/:end/:votedfor
---------
get stats by age and candidate

/stats/bcv/:bcity/:votedfor
---------
get stats by bcity and candidate



candidate =>

/addcandidate
---------
Add(insert) new candidate

/candidate
---------
get all candidates

/candidate/:id
increase the vote count by one by using nid of the candidate