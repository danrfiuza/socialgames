import { Meteor } from 'meteor/meteor';
import { Games } from './game.js';

Meteor.methods({
    'game.insert'(game) {
        game.createdAt = new Date();
        Games.insert(game);
        return true;
    },
    'game.find'() {
        return Games.find({}).fetch();
    }
});