const cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;
require("dotenv").config();

var request = require("request");

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/getOrders", (req, res) => {
  console.log(req.query.auth)
  date = req.query.date
  offset = req.query.offset
  console.log(decodeURIComponent(date))
  var options = {
    method: "GET",
    url: "https://api.ebay.com/sell/fulfillment/v1/order?filter=creationdate:%5B" + date + '..%5D&limit=50&offset=' + offset,
    headers: {
      Authorization:
        "Bearer " + decodeURIComponent(req.query.auth),
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body)
    console.log(response.body);
  });

});


app.get("/api/auth", (req, res) => {
  console.log(process.env.REACT_APP_EBAY_AUTH)
  var options = {
    method: "POST",
    url: "https://api.ebay.com/identity/v1/oauth2/token",
    headers: {
      Authorization: process.env.REACT_APP_EBAY_AUTH,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      grant_type: "authorization_code",
      code: req.query.auth,
      redirect_uri: "Vance_Vescogni-VanceVes-itemTr-mdfozt",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body)
    //console.log(response.body);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
