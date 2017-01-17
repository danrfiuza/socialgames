import { Meteor } from 'meteor/meteor';
import { Places } from './place.js';

Meteor.methods({
    'places.insert'(place){
      place.created_at = new Date().getTime();
      Places.insert(place);
      return true;
    },
    'places.find'(){
        return Places.find({}, {sort: {created_at: -1}}).fetch();
    },
    'places.findOne'(criteria){
        return Places.find(criteria).fetch();
    }
});
