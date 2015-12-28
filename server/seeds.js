Meteor.startup(function(){
  var dummyUserEmail = 'demo@demo.com';

  if (Meteor.users.find({"emails.address": dummyUserEmail}).count() == 0) {
    // Create a test user. 'createUser' returns the id of the created user
    var ownerId = Accounts.createUser({
      email: dummyUserEmail,
      password: 'root'
    });

    // Create some Teams
    [
      {
        name: "Barcelona",
        gameIds: [],
        ownerId: ownerId
      },
      {
        name: "Real Madrid",
        gameIds: [],
        ownerId: ownerId
      },
      {
        name: "Mohammed's team",
        gameIds: [],
        ownerId: ownerId
      }
    ].forEach(function(team){
      Teams.insert(team);
    });

    // create a game
    var team1 = Teams.find().fetch()[0];
    var team2 = Teams.find().fetch()[1];
    var team3 = Teams.find().fetch()[2];

    var game = {
      completed: false,
      ownerId: ownerId,
      teams: [
        {name: team1.name, _id: team1._id, score: 0},
        {name: team2.name, _id: team2._id, score: 0},
        {name: team3.name, _id: team3._id, score: 0}
      ]
    }
    gameId = Games.insert(game);

    // Adding game ids to teams > gameIds felid
    Teams.update({_id: team1._id}, {$addToSet: {gameIds: gameId}});
    Teams.update({_id: team2._id}, {$addToSet: {gameIds: gameId}});
    Teams.update({_id: team3._id}, {$addToSet: {gameIds: gameId}});
  }
});
