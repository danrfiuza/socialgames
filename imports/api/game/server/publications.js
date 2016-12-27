import { Meteor } from 'meteor/meteor';
import { Games } from '../game.js';

Meteor.publish('game.list', function(){
    return Games.find();
});