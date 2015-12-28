Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});
// Router.route('/', function(){
//   Router.go('games');
// });
Router.route('/', {
  name: 'games',
  waitOn: function(){
    return [Meteor.subscribe("games"), Meteor.subscribe("teams")];
  }
});

Router.route('/teams', {
  waitOn: function() {
    return Meteor.subscribe("teams");
  }
});

var requirLogin = function () {
  if (!Meteor.user()) {
    if(Meteor.loggingIn()) {
      this.render("loading");
    } else {
      this.render("accessDenied");
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requirLogin);

// Router.onBeforeAction(myAdminHookFunction, {
//   only: ['admin']
//   // or except: ['routeOne', 'routeTwo']
// });
