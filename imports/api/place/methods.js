import { Meteor } from 'meteor/meteor';
import { Places } from './place.js';

Meteor.methods({
    'places.insert'(place){
        Places.insert(place);
        return true;
    },
    'places.find'(){
        return Places.find().fetch();
    }
});