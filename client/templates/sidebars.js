import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

Template.sidebar.helpers({
    emailAddress: function () {
        var user = Meteor.user();
        if (user && user.emails) {
            return user.emails[0].address;
        } else {
            return "";
        }
    },
    userId: function () {
        var user = Meteor.user();
        if (user && user._id) {
            return user._id;
        } else {
            return "";
        }
    }
});
