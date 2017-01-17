import { Meteor } from 'meteor/meteor';
import { Games } from './game.js';

Meteor.methods({
    'game.insert'(game) {
        game.createdAt = new Date();
        Games.insert(game);
        return true;
    },
    'game.list'() {
        return Games.find({}).fetch();
    },
    'game.find'(criteria) {
        return Games.find(criteria).fetch();
    },
    'game.findOne'(key) {
        return Games.find({_id: key}).fetch();
    }
});