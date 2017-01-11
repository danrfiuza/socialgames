import { Meteor } from 'meteor/meteor';
import { Matchs } from '../match.js';

Meteor.publish('match', function () {
    return Meteor.users.find({}, {fields: {_id: 1, emails: 1, services: 1, profile: 1}});
});