import { Meteor } from 'meteor/meteor';
import { Matchs } from './match.js';

Meteor.methods({
    'matchs.insert'(match){
        Matchs.insert(match);
        return true;
    },
    'matchs.find'(){
        return Matchs.find().fetch();
    }
});