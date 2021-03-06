let express = require("express");
let router = express.Router();
let request = require("request");
router.post("/getbalance", async (req, res, next) => {
    res.set("Content-Type", "application/json");
    if (!req.query.address) {
        return res.json(JSON.stringify({
            inputError: "This field is required!"
        }));
    }
    request(
        `https://insight.garli.co.in/insight-grlc-api/addr/${req.query.address}`,
        (err, resp, body) => {
            body = JSON.parse(body);
            return res.json(body.balance);
        }
    );
});
router.get("/about", (req, res, next) => {
    res.render("about");
});
/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("index");
});

module.exports = router;
