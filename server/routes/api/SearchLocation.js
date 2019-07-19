const url = require("url");
const fetch = require("node-fetch");
//const config = require("./config");

//bir request geldiginde "/search-location-weather"
//configType ina bakariz 'coordinates' gelebilir ,latitude ve longitude gonderilebilir
//search-location-weather adresi sorglandiginda weather apisine sorgu yapiyoruz
module.exports = app => {
  let zipcode;

  app.post("/search-location", (req, res) => {
    zipcode = req.body.zipcode;

    if (!zipcode || zipcode.length != 5) res.redirect("/error");
    else res.redirect("/current-weather");
  });
  //parametre olarak app yi kullanmasak ,post metodunu kullanamiyoruz
  app.get("/search-location-weather", (req, res) => {
    //build api URL with user zip
    const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
    const apiId = "&appid=<YOUR API KEY GOES HERE>&units=imperial";

    zipcode = req.body.zipcode;

    if (!zipcode || zipcode.length != 5) res.redirect("/error");
    else res.redirect("/current-weather");

    const apiUrl = userLocation(baseUrl, apiId, zipcode);

    const userLocation = (url1, url2, zipcode) => {
      let newUrl = url1 + zipcode + url2;
      return newUrl;
    };

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        res.send({ data });
      })
      .catch(err => {
        res.redirect("/error");
      });
  });

  app.post("/search-location-weather", (req, res) => {
    //const requestBody = req.body;
    let requestQuery = { appid: config.APIKey };

    if (req.body.locationType !== "coordinates") {
      requestQuery[req.body.locationType] = req.body.locationData;
    } else {
      if (req.body.locationData.latitude)
        requestQuery["lat"] = req.body.locationData.latitude;

      if (req.body.locationData.longitude)
        requestQuery["lon"] = req.body.locationData.longitude;
    }
    //Bi URL donuyoruz ,API key i  de gonderiyoruz
    const apiURL = url.format({
      protocol: "http",
      hostname: "api.openweathermap.org",
      path: "/data/2.5/weather",
      query: requestQuery
    });

    fetch(apiURL)
      .then(res => res.json())
      .then(data => {
        res.send({ data });
      })
      .catch(err => {
        res.redirect("/error");
      });
  });
};
