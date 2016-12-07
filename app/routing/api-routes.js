// Routes
// =============================================================
// Search for Specific Character (or all characters) - provides JSON


var apiRoutes = function(){

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

}

modules.exports = apiRoutes; //check to see if htis is correct
