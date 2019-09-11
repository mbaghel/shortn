const express = require("express");
const mongoose = require("mongoose");
const validUrl = require("valid-url");
require("dotenv").config();
const app = express();
const base58 = require("./base58");

// require url db model
const Url = require("./dbModels");

// connect to db
mongoose.connect(process.env.MONGO_URI);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// handle new url additions
app.get("/api/new", function(req, res) {
  const url = req.query.url;

  let shortUrl = "";

  // check validity of passed url
  if (!validUrl.isWebUri(url)) {
    return res.status(400).send(JSON.stringify({ error: "Invalid URL" }));
  }
  // check if url already in database
  const query = Url.findOne({ long_url: url });

  query.then(function(doc) {
    // return stored data if found
    if (doc) {
      shortUrl = req.hostname + "/" + base58.encode(doc._id);
      return res.send(
        JSON.stringify({ original_url: url, short_url: shortUrl })
      );
    }

    // create new entry and return new short url
    const newUrl = Url({ long_url: url });
    const save = newUrl.save();

    save.then(function(urlEntry) {
      shortUrl = req.hostname + "/" + base58.encode(urlEntry._id);
      res.send(JSON.stringify({ original_url: url, short_url: shortUrl }));
    });
    save.catch(function(err) {
      handleError(err, res);
    });
  });
  query.catch(function(err) {
    handleError(err, res);
  });
});

// handle requests to short urls
app.get("/:hash", function(req, res) {
  const hash = req.params.hash;
  const id = base58.decode(hash);

  const query = Url.findById(id);

  query.then(function(doc) {
    if (!doc) {
      return res
        .status(404)
        .send(JSON.stringify({ error: "Short url not found" }));
    }
    res.redirect(doc.long_url);
  });
  query.catch(function(err) {
    handleError(err, res);
  });
});

// error handling function for db errors
function handleError(err, res) {
  console.error("database error", err);
  res
    .status(500)
    .send(JSON.stringify({ error: "failed to communicate with database" }));
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
