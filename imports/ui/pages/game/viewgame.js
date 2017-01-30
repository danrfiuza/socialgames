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
            for (var i=0; i < gArtists.lenght; i++) {
                console.log(gArtists[i].text);
                artists += gArtists[i].text;
                if (!(i+1) == gArtists.lenght) {
                    artists += " e ";
                }
            }
            return artists;
        } else {
            return gArtists.text;
        }
    },
    gamePublisher() {
        return rGame.get().publisher.text;
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