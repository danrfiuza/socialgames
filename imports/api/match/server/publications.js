import { Meteor } from 'meteor/meteor';
import { Matchs } from '../match.js';

Meteor.publish('match.list', function () {
    return Matchs.find({});
});