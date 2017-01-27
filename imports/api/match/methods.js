import {Meteor} from 'meteor/meteor';
import {Matchs} from './match.js';
import {Games} from '../game/game.js';

Meteor.methods({
    'matchs.insert'(match) {
        result = Matchs.insert(match, function (err, result) {
            if (err == null) {
                return result;
            } else {
                return err;
            }
        });
        return result;
    },
    'matchs.find'() {
        return Matchs.find().fetch();
    },
    'matchs.findOne'(key) {
        return Matchs.find({_id: key}).fetch();
    },
    'matchs.list'(){
        return Matchs.find().fetch();
    },
    'matchs.findCount'(user){
        return Matchs.find({"players.mail": user.emails[0].address}).count();
    },
    'matchs.findCountDistinct'(user){
        result = Matchs.find({"players.mail": user.emails[0].address}).fetch();

        arrCount = [];
        result.forEach(function (value) {
            if (!_.contains(arrCount, value.game)) {
                arrCount.push(value.game);
            }
        });
        // console.log(arrCount.length);
        return arrCount.length;
    },

    // add a player in match
    'matchs.addPlayer' (params) {
        return Matchs.update({_id: params.match_id}, {$push: {players: params.player}});
    },


    'matchs.findByUser' (userId) {
        //@todo Modificar Matchs para receber um ID e ñ o e-mail
        var user = Meteor.users.findOne({_id: userId});
        // console.log(user.emails[0].address);
        // console.log(Matchs.find({ "players.mail": user.emails[0].address} ).fetch());
        return Matchs.find({ "players.mail": user.emails[0].address} ).fetch();
    },
    'matchs.gamesTop30'(){
        var data30atras = new Date();
        data30atras.setDate(data30atras.getDate() - 30);
        dateTimeStamp = data30atras.getTime();

        var distinctEntries = _.uniq(Matchs.find({created_at: {$gt: dateTimeStamp}}, {
            sort: {game: 1}, fields: {game: true}
        }).fetch().map(function (x) {
            return x.game;
        }), true);

        arrObj = [];
        totalPartidas = 0;
        _.map(distinctEntries, function (value) {
            prepareValue = Games.findOne({_id: value});
            prepareValue = Games.findOne({_id: value});
            prepareValue.totalPartidas30dias = Matchs.find({game: value, created_at: {$gt: dateTimeStamp}}).count();
            totalPartidas = totalPartidas + prepareValue.totalPartidas30dias;
            arrObj.push(prepareValue);
        });

        //Ordena o array
        arrObj = _.sortBy(arrObj, 'totalPartidas30dias');

        //Deixa somente os itens mais jogados, o menos relevantes são excluidos do grafico
        arrStart = arrObj.length - 7;
        arrEnd = arrObj.length;

        if (arrStart < 0) {
            arrStart = 0;
        }
        arrObj = arrObj.slice(arrStart, arrEnd);

        return {
            totalPartidas: totalPartidas,
            arrObj: arrObj
        };
    }
});