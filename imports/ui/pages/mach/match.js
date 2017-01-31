import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';

import './match.html';

var rMatch = new ReactiveVar(0);

Template.matches.helpers({
    matchs () {
        console.log(rMatch.get());
        return rMatch.get();
    }
});

Template.matches.events({
    // Search games
    'click #btnNewMatch': function (event, template) {
        location.href = '/newmatch';
    }
});

Template.matches.onCreated(function () {
    Meteor.call('matchs.findByUserAndGameDocs', Meteor.user()._id, function (e, result) {
        var retorno = [];
        console.log('assdf');
        console.log(result);
        // _.map(result, function (value, key) {
            var obj;

            //Adiciona dados do jogo no array
            // Meteor.call('game.findOne', value.game, function (eGame, resultGame) {
            //     console.log('cccccc');
            //     // console.log(value.timer);
            //
            //     var objPlayers;
            //     _.map(value.players, function (playersValue, playersKey) {
            //         Meteor.users.findOne({});
            //         objPlayers.push(obj);
            //
            //
            //         obj = {
            //             _id: value._id,
            //             players: value.players,
            //             timer: value.timer,
            //             place: value.place,
            //             game: resultGame[0],
            //             numeroParticipantes: value.players.length
            //
            //         };
            //
            //         retorno.push(obj);
            //     })
            // });









            //Adiciona dados dos usuario no array
            // Meteor.call('game.findOne', value.game, function (eGame, resultGame) {
            //     console.log('cccccc');
            //     // console.log(value.timer);
            //     obj = {
            //         _id: value._id,
            //         players: value.players,
            //         timer: value.timer,
            //         place: value.place,
            //         game: resultGame[0],
            //         participantes: value.players.length
            //
            //     };
            //     retorno.push(obj);
            // });
        // });

        rMatch.set(retorno);
    });


});
