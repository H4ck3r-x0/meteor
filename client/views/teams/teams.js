Template.teams.helpers({
	isCreatingTeam: function (){
		return Session.get('isCreatingTeam');
	},
	teams: function () {
		return Teams.find();
	},
	teamsCount: function () {
		return Teams.find().count();
	}
});

Template.teams.events({
	'click .create': function (e, template){
		e.preventDefault();
		Session.set('isCreatingTeam', true);
	},
	'click .cancel': function (e, template) {
		e.preventDefault();
		Session.set('isCreatingTeam', false);
	},
	'submit form.create-team': function (e, template) {
		e.preventDefault();
		var team = {
			name: template.$('input[name=teamName]').val(),
			ownerId: Meteor.userId()
		};

		Teams.insert(team, function(error, _id){
			if (error) {
				alert(error);
				Session.set('isCreatingTeam', true);
				Tracker.afterFlush(function(){
					template.$('input[name=teamName]').val(teamName);
				})
			}
		});
		Session.set('isCreatingTeam', false);
	}
});
