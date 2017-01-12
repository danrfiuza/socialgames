import {Meteor} from 'meteor/meteor';
import {Matchs} from './match.js';

Meteor.methods({
    'matchs.insert'(match) {
        result = Matchs.insert(match, function(err, result){
            if (err == null) {
                return result;
            } else {
                return err;
            }
        });
        return result;
    },
    'matchs.find'(){
        return Matchs.find().fetch();
    },
    'matchs.findCount'(user){
        return Matchs.find({"players.mail": user.emails[0].address}).count();
    },
    'matchs.findCountDistinct'(user){
        result = Matchs.find({"players.mail": user.emails[0].address}, { sort: { "game._id": 1 } } ).fetch();

        arrCount = [];
        result.forEach(function (value) {
            if (! _.contains( arrCount, value.game) ) {
                arrCount.push(value.game);
            }
        });

        return arrCount.length;
    }
});