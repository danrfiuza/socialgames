import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import "./game.html";

var rGames = new ReactiveVar([]);
var rSearch = new ReactiveVar(0);

Template.games.rendered = function () {
    $("#divBtnNewGame").hide();
    searchGame('');
};

Template.games.helpers({
    games() {
        return rGames.get();
    },
    search() {
        return rSearch.get();
    }
});

Template.games.events({
    'click #btnSearchGame': function () {
        rSearch.set($("#search").val());
        if ($("#search").val() == "") {
            Bert.alert('Escreva algum valor no campo de busca');
        } else {
            searchGame($("#search").val());
        }
    }
});

function searchGame(search) {
    var criteria = {'name': {$regex: '.*' + search + '.*', $options: "$i"}};
    Meteor.call('game.find', criteria, function (e, result) {
        rGames.set(result);
        if (result.length == 0) {
            Bert.alert('Nenhum resultado encontrado');
        }
    });
    $("#divBtnNewGame").show();
}