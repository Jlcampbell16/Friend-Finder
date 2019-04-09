var friends = require("../data/friends");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    return res.json(friends);
  });


  app.post("/api/friends", function(req, res) {
    var userInput = req.body;
    var userScores = userInput.scores;
    var bestMatch = {
      name: "",
      picture: "",
      diff: 1000
    }
    var totalDiff = 0;
    for (var i = 0; i < friends.length; i++) {
      var currFriend = friends[i];
      totalDiff = 0;

      for (var j = 0; j < userScores.length; j++) {
        var currentScores = currFriend.scores;
        totalDiff += Math.abs(parseInt(currentScores) - parseInt(userScores));
      }
      if (totalDiff < bestMatch.diff) {
        bestMatch.name = currFriend.name;
        bestMatch.picture = currFriend.picture;
        bestMatch.diff = totalDiff;
      }
    }

    friends.push(req.body);
    res.json(bestMatch);
  })
}