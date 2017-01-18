import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './match.html';

Template.matches.events({
    // Search games
    'click #btnNewMatch' : function(event, template) {
    	location.href = '/newmatch';
    }
});