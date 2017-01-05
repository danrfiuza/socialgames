import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './game.html';

var rGames = new ReactiveVar([]);

Template.games.helpers({
    games() {
        return rGames.get();
    }
});

Template.games.events({
	'click #btnSearchGame' : function(event, template){
		var criteria = {"name": {$regex:".*" + $("#search").val() + ".*"}}
        Meteor.call('game.find', criteria, function (e, result) {
        	console.log(result);
            rGames.set(result);
        });
    }
});