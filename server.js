// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Dummy Characters (DATA)
// =============================================================
var matches = [{
  routeName: "johnmal",
  name: "John Mal",
  photo :"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  scores :[
     5,
     1,
     4,
     4,
     5,
     1,
     2,
     5,
     4,
     1
   ]
}, {
  routeName: "hankmcgover",
  name: "Hank McGover",
  photo :"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  scores :[
     1,
     1,
     1,
     1,
     1,
     1,
     1,
     1,
     1,
     1
   ]
}, {
  routeName: "lukewalker",
  name: "Luke Walker",
  photo :"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  scores :[
     5,
     5,
     5,
     5,
     5,
     5,
     5,
     5,
     5,
     5
   ]
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/friends/:characters?", function(req, res) {
  var chosen = req.params.characters;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < matches.length; i++) {
      if (chosen === matches[i].routeName) {
        res.json(matches[i]);
        return;
      }
    }

    res.json(false);
  }
  else {
    res.json(matches);
  }
});

// Create New Characters - takes in JSON input
app.post("/api/newfriend", function(req, res) {
  var newcharacter = req.body;
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  matches.push(newcharacter);

  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
