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

        _.map(result, function (value, key) {

            // @TODO melhorar essa pancada de consultas que são feitas aqui mas diz a lenda q isso ñ tem problema no MongoDB
            var objPlayers = [];
            _.map(value.players, function (playerValue, playerKey) {
                objPlayers.push(Meteor.users.findOne({_id: playerValue.user_id}));
            });

            var vencedor = false;
            if (value.winner == Meteor.user()._id) {
                vencedor = true;
            }

            obj = {
                _id: value._id,
                players: value.players,
                timer: value.timer,
                place: value.place,
                game: value.games_docs[0],
                numeroParticipantes: value.players.length,
                user_docs: objPlayers,
                vencedor: vencedor

            };
            retorno.push(obj);
        });

        console.log(retorno);
        rMatch.set(retorno);
    });


});
