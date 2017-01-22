import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import './schedule.html';

rMatch = new ReactiveVar(0);
rGame = new ReactiveVar(0);
rPlace = new ReactiveVar(0);

Template.schedule.rendered = function () {
	Meteor.call('matchs.findOne', document.match_id, function (e, result) {
        rMatch.set(result[0]);
        gameId = result[0].game;
        placeId = result[0].place;
        Meteor.call('game.findOne', gameId, function (e, result) {
	        rGame.set(result[0]);
	    });
        Meteor.call('places.findOne', {_id: placeId}, function (e, result) {
            rPlace.set(result[0]);
        });
    });

};

Template.schedule.helpers({
    game () {
        return rGame.get();
    },
    players () {
    	return rMatch.get().players;
    },
    qtdVaga () {
        return rGame.get().maxplayers - rMatch.get().players.length;
    },
    crowded() {
        if ((rGame.get().maxplayers - rMatch.get().players.length) <= 0) {
            return true;
        } else {
            return false;
        }
    },
    place () {
        return rPlace.get().name;
    }
});

Template.schedule.events({
    'click #btnAcept' : function(event, template) {

        var params = {
            player: {
                user_id: Meteor.user()._id,
                first: false,
                firstName: Meteor.user().profile.name.split(" ", 1)[0]
            },
            match_id: document.match_id
        }

        Meteor.call('matchs.addPlayer', params, function (err, result) {
            if (err == null) {
                Bert.alert('Convite aceito!', 'success');
            } else {
                Bert.alert('Ocorreu um erro ao tentar gravar a informação', 'danger');
            }
        });
    }
});