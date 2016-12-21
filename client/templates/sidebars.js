import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

if (Meteor.isClient) {
    Template.sidebar.events({
        'click nav.sidebar li a': function(event){
            $('.active-title strong').html(event.currentTarget.title);
            $('body').removeClass('aside-toggled');
        }
    });
}

Template.sidebar.helpers({
    emailAddress: function () {
        var user = Meteor.user();
        if (user && user.emails) {
            return user.emails[0].address;
        } else {
            return "";
        }
    }
});
