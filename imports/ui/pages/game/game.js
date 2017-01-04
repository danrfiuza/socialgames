import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './game.html';

var rGames = new ReactiveVar([]);

Template.games.helpers({
    games() {
        Meteor.call('game.find', {}, function (e, result) {
            rGames.set(result);
        });
        return rGames.get();
    }
})