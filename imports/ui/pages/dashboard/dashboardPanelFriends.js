import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

// export const Friends = new Mongo.Collection('friends');
var amigos = new ReactiveVar(0);

Template.dashboardPanelFriends.helpers({
    amigos() {
        Meteor.call('friends.getUserFriends', Meteor.user(), function (e, result) {
            // amigos = result;
            amigos.set(result);
        });
        // console.log(amigos);
        return amigos.get();
    }
});

// Template.dashboardPanelFriends.events({
//     //add your events here
// });
//
// Template.dashboardPanelFriends.onCreated(function () {
//     //add your statement here
// });
//
// Template.dashboardPanelFriends.onRendered(function () {
//     //add your statement here
// });
//
// Template.dashboardPanelFriends.onDestroyed(function () {
//     //add your statement here
// });

