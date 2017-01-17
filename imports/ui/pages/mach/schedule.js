import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import './schedule.html';

rMatch = new ReactiveVar(0);
rGame = new ReactiveVar(0);

Template.schedule.rendered = function () {
	Meteor.call('matchs.findOne', document.match_id, function (e, result) {
        rMatch.set(result[0]);
        gameId = result[0].game;
        Meteor.call('game.findOne', gameId, function (e, result) {
	        rGame.set(result[0]);
	    });
    });
};

Template.schedule.helpers({
    game () {
        return rGame.get();
    },
    players() {
    	return rMatch.get().players;
    }
});