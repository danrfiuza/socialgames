import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import "./viewgame.html";

var rGame = new ReactiveVar(0);

Template.viewgame.rendered = function () {
    searchGame(document.game_id);
};

Template.viewgame.helpers({
    boardgame() {
        return rGame.get();
    }
});

function searchGame(key) {
    Meteor.call('game.findOne', key, function (e, result) {
        rGame.set(result[0]);
        if (result.length == 0) {
            Bert.alert('Nenhum resultado encontrado');
        }
    });
}