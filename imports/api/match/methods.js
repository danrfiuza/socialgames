import {Meteor} from 'meteor/meteor';
import {Matchs} from './match.js';

Meteor.methods({
    'matchs.insert'(match){
        Matchs.insert(match);
        return true;
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
    },
    'matchs.gamesTop30'(){
        console.log('chmou o chamado');
        // result = Matchs.find({"players.mail": user.emails[0].address}, { sort: { "game._id": 1 } } ).fetch();
        //
        // arrCount = [];
        // result.forEach(function (value) {
        //     if (! _.contains( arrCount, value.game) ) {
        //         arrCount.push(value.game);
        //     }
        // });
        //
        // return arrCount.length;
    }
});