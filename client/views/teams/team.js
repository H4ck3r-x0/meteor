Template.team.helpers({
  isEditingTeam: function(){
    return Session.get('editedteamId') === this._id;
  }
});

Template.team.events({
  'click .edit-team': function(e, template){
    e.preventDefault();
    Session.set('editedteamId', this._id);
  },
  'submit form.editingTeam-form': function(e, template){
    e.preventDefault();
    var teamName = template.$("input[name='teamName']").val();
    var self = this;

    if(teamName.length){
      Meteor.call('teamUpdate', this._id, teamName, function(error){
        if (error) {
          alert(error.reason);
          Session.set('editedteamId', slef._id);
          Tracker.afterFlush(function(){
            template.$('input[name=teamName]').val();
            template.$('input[name=teamName]').focus();
          });
        }
      });

      Session.set('editedteamId', null);
    }
  },
  'click .cancel-editing': function(e, template){
    e.preventDefault();
    Session.set('editedteamId', null);
  },
  'click .remove-team': function(e, template){
		e.preventDefault();
		var id = this._id;
		Teams.remove(id);
	}
});
