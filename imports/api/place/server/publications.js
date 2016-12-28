import { Meteor } from 'meteor/meteor';
import { Places } from '../place.js';
Meteor.publish('places.list', function(){
    return Places.find();
});