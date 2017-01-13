import {Meteor} from 'meteor/meteor';
import {Matchs} from './match.js';
import { Games } from '../game/game.js';

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
    },
    'matchs.gamesTop30'(){
        console.log('chmou o chamado');
        var data30atras = new  Date();
        data30atras.setDate(data30atras.getDate() - 30);
        dateTimeStamp = data30atras.getTime();

        // result = Matchs.find({ created_at: { $gt: dateTimeStamp }  }, {sort: {_id: -1} }).fetch();

        var distinctEntries = _.uniq(Matchs.find({ created_at: { $gt: dateTimeStamp }  }, {
            sort: {game: 1}, fields: {game: true}
        }).fetch().map(function(x) {
            return x.game;
        }), true);

        console.log('aki estamos');
        arrObj = [];
        _.map(distinctEntries, function (value) {
            console.log(Games.find({ _id: value}).fetch());
            // arrObj.push();
        });

        // console.log(Meteor.Games.find({}));





        // arrCount = [];
        // objDistinctGames = {};
        // result.forEach(function (value) {
        //     if (! _.contains( arrCount, value.game) ) {
        //         arrCount.push(value.game);
        //         objDistinctGames = { value.game: { matchs: 0 } };
        //     }
        // });


        // return arrCount.length;
    }
});