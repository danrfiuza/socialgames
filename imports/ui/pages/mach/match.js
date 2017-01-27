import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import './match.html';

var rMatch = new ReactiveVar(0);

Template.matches.helpers({
    matchs () {
        console.log(rMatch.get());
        return rMatch.get();
    }
});

Template.matches.events({
    // Search games
    'click #btnNewMatch' : function(event, template) {
    	location.href = '/newmatch';
    }
});

Template.matches.onCreated(function(){
    Meteor.call('matchs.findByUser', Meteor.user()._id, function (e, result) {
        rMatch.set(result);
    });
});
