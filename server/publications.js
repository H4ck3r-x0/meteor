// Publishing teams collecation
Meteor.publish('teams', function() {
    return Teams.find({ownerId: this.userId}, {limit: 10});
});

// Publishing games collecation
Meteor.publish('games', function(){
    return Games.find({ownerId: this.userId}, {limit: 10});
});
