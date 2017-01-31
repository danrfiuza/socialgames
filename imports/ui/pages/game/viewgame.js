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
    },
    resumeDescription() {
        return rGame.get().description.slice(0, 300) + ' ...';
    },
    gameArtists() {
        var artists = '';
        var gArtists = rGame.get().artist;
        if (Array.isArray(gArtists)) {
            for (var i=0; i < gArtists.length; i++) {
                artists += gArtists[i].text;
                if ((i+1) != gArtists.length) {
                    artists += " , ";
                }
            }
            return artists;
        } else {
            return gArtists.text;
        }
    },
    gamePublisher() {
        var editoras = '';
        var gPublisher = rGame.get().publisher;
        if (Array.isArray(gPublisher)) {
            for (var i=0; i < gPublisher.length; i++) {
                editoras += gPublisher[i].text;
                if ((i+1) != gPublisher.length) {
                    editoras += " , ";
                }
            }
            return editoras;
        } else {
            return gPublisher.text;
        }
    },
    gameExpansions() {
        var expansoes = '';
        var gExpansion = rGame.get().expansion;
        if (Array.isArray(gExpansion)) {
            for (var i=0; i < gExpansion.length; i++) {
                editoras += gExpansion[i].text;
                if ((i+1) != gExpansion.length) {
                    expansoes += " , ";
                }
            }
            return expansoes;
        } else {
            return gExpansion.text;
        }
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