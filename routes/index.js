let express = require('express');
let router = express.Router();
let request = require("request");
router.post('/getbalance', async (req, res, next) => {
  if (!req.query.address) {
    return res.json({ inputError: "This field is required!" });
  } 
  request(`https://garli.co.in/ext/getbalance/${req.query.address}`, (err, resp, body) => {
    return res.json(JSON.parse(resp.body));
  });
});
router.get("/about", (req, res, next) => {
  res.render("about");                      // TODO: write about page
});
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;