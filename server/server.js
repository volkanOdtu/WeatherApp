const express = require("express");
const app = express();
const port = 5000;
const fetch = require("node-fetch");

const config = require("./config");
//var config = require("./config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // it parses incoming requests

require("./routes")(app);

app.get("/", (req, res) => {
  res.send("Port 5000: " + config.APIKey);
  //res.send(config.APIKey); //Client a data gonderdikten sonra tekrar gonderemicez
});

app.get("/search-location-weather", (req, res) => {
  //Lets prepare URL by using zipCode
  const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
  const apiId = "&APPID=99b8f8897c4daf2d48053bc43310b9d4&units=imperial";

  //zipcode = req.body.zipcode;
  zipcode = req.query.zipcode;

  /*
  if (!zipcode || zipcode.length != 5) res.redirect("/error");
  else res.redirect("/current-weather");
 */
  console.log("ZIPcode olarak su geldi " + zipcode);

  const userLocation = (url1, url2, zipcode) => {
    let newUrl = url1 + zipcode + url2;
    return newUrl;
  };

  const apiUrl = userLocation(baseUrl, apiId, zipcode);
  console.log("returning apiURL: " + apiUrl);

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.redirect("/error");
    });
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});
