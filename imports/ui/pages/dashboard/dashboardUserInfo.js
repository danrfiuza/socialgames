import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

export const Matchs = new Mongo.Collection('matchs');

var rMatchs = new ReactiveVar([]);

Template.dashboardUserInfo.helpers({
    user() {
        var usuarioId = Meteor.userId();
        return Meteor.users.findOne({_id: usuarioId});
    },
    friends() {
        return Friends.find({meu_id: Meteor.user()._id});
    },
    userInfo() {
        totalDePartidas( Meteor.user() );
        jogosExperimentados( Meteor.user() );
        mediaVitoria = '85%';

        return {
            totalPartidas: rMatchs['totalPartidas'],
            jogosExperimentados: rMatchs['jogosExperimentados'],
            mediaVitoria: mediaVitoria
        }
    }
});

function totalDePartidas(user) {
    Meteor.call('matchs.findCount', user, function (e, result) {
        rMatchs['totalPartidas'] = result;
    });
}

function jogosExperimentados(user) {
    Meteor.call('matchs.findCountDistinct', user, function (e, result) {
        rMatchs['jogosExperimentados'] = result;
    });
}