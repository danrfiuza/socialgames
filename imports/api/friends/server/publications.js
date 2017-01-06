import {Meteor} from 'meteor/meteor';
import {Friends} from '../friend.js';


Meteor.publish('friends.listEmails', function () {
    return Meteor.users.find({}, {fields: {_id: 1, emails: 1, services: 1, profile: 1}});
});

Meteor.publish('friends.list', function () {
    return Friends.find();
});