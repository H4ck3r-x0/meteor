Template.games.helpers({
    games: function(){
      return Games.find();
    },
    teams: function(){
      return Teams.find();
    },
    isCreatingGame: function(){
      return Session.get('isCreatingGame');
    }
});


Template.games.events({
  'click .create': function(e, template){
    e.preventDefault();
    Session.set('isCreatingGame', true);
  },
  'click .cancel': function(e, template){
    e.preventDefault();
    Session.set('isCreatingGame', false);
  },
  'submit form.create-game': function(e, template){
    e.preventDefault();
    var teamOneId = template.$("select[name=teamOne]").val();
    var teamTwoId = template.$("select[name=teamTwo]").val();

    Meteor.call('gamesInsert', teamOneId, teamTwoId, function(error, response){
      if(error){
        alert(error.reason);
        Session.set('isCreatingGame', true);
        Tracker.afterFlush(function(){
          template.$("select[name=teamOne]").val(teamOneId);
          template.$("select[name=teamTwo]").val(teamTwoId);
        });
      }
    });
    Session.set('isCreatingGame', false);
  }
});
