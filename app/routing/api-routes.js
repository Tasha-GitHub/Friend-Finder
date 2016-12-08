// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information
// ===============================================================================

var friendMatches = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // ---------------------------------------------------------------------------

  app.get("/api/friends/:characters?", function(req, res) {
    var chosen = req.params.characters;

    if (chosen) {
      console.log(chosen);
      //checks if a users input is in the given array and if so responds with correct match
      for (var i = 0; i < friendMatches.length; i++) {
        if (chosen === friendMatches[i].routeName) {
          res.json(friendMatches[i]);
          return;
        }
      }

      res.json(false);
    }
    else {
      //other wise just print everything
      res.json(friendMatches);
      
    }
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/newfriend", function(req, res) {
    var newcharacter = req.body;
    //adds routename to user input, so that name can be searchable in url
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
    //converts user text input into number input
    for(var i = 0 ; i < newcharacter.scores.length; i++){
      newcharacter.scores[i] = parseInt(newcharacter.scores[i]);
    }
    
    //pushes to new array
    friendMatches.push(newcharacter);
    //responds with json of new character
    res.json(newcharacter);
  });

};
