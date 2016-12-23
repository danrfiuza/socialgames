import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

Template.sidebar.helpers({
    userId: function () {
        var user = Meteor.user();
        if (user && user._id) {
            return user._id;
        } else {
            return "";
        }
    },
    userName: function () {
        var user = Meteor.user();
        if (user && user.services.facebook) {
            return user.services.facebook.name;
        }
        else {
            return "";
        }
    },
    userEmail: function () {
        var user = Meteor.user();
        if (user && user.emails) {
            return user.emails[0].address;
        } else if (user && user.services.facebook) {
            return user.services.facebook.email;
        }
        else {
            return "";
        }
    }
});

if (Meteor.isClient) {
    Template.sidebar.events({
        'click nav.sidebar li a': function(){
            $('body').removeClass('aside-toggled');
        }
    });
}