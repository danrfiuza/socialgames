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
        console.log('server de verdade');
        // console.log(user);
        // var distinctEntries = _.uniq(Matchs.find({"players.mail": user.emails[0].address}, {
        //     sort: {
        //         "game._id": 1
        //     }
        // }).fetch(), true, doc => {
        //     return doc.game._id;
        // });


        result = Matchs.find({"players.mail": user.emails[0].address}, { sort: { "game._id": 1 } } ).fetch();

        count = 0;
        result.forEach(function (value) {
            console.log(value);
        });

        console.log(distinctEntries);
        return distinctEntries.length;
    }
});