Template.game.events({
  "click .finish-game": function(e, template){
     e.preventDefault();
     Games.update({_id: this._id}, {$set: {completed: true}});
  },
  "click .delete-game": function(e, template){
    e.preventDefault();
    var gameId  = this._id;
    var teamIdA = this.teams[0]._id;
    var teamIdB = this.teams[1]._id;

     Games.remove(gameId, function (error) {
       if (!error) {
         Teams.update({_id: teamIdA}, {$pull: {gameIds: gameId}});
         Teams.update({_id: teamIdB}, {$pull: {gameIds: gameId}});
       }
     });
  },
  "click .one-plus": function(e, template){
    e.preventDefault();
    Games.update({_id: this._id}, {$inc: {"teams.0.score": 1}});
  },
  "click .two-plus": function(e, template){
    e.preventDefault();
    Games.update({_id: this._id}, {$inc: {"teams.1.score": 1}});
  },
  "click .one-minus": function(e, template){
    e.preventDefault();
    Games.update({_id: this._id}, {$inc: {"teams.0.score": -1}});
  },
  "click .two-minus": function(e, template){
    e.preventDefault();
    Games.update({_id: this._id}, {$inc: {"teams.1.score": -1}});
  }
});
