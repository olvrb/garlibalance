let express = require('express');
let router = express.Router();
let request = require("request");
router.get('/getbalance', async (req, res, next) => {
  request(`https://garli.co.in/ext/getbalance/${req.query.address}`, (err, resp, body) => {
    return res.json(resp.body);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
