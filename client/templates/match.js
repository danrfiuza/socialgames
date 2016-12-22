import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'

Meteor.subscribe('game.list');

var rGame = new ReactiveVar(0);
var rMaxPlayers = new ReactiveVar(0);
var rMinPlayers = new ReactiveVar(0);
var clock = new ReactiveClock("clock");
clock.setElapsedSeconds(0);
clock.stop();

Games = new Mongo.Collection('games');

Template.matches.rendered = function(){
    $("#selectGame").select2({
    	placeholder: "Começe a digite o nome do jogo",
    	maximumSelectionLength: 1,
      	allowClear: true
    });

    $('#viewGame').hide();
    $('#divPlayers').hide();
    $('#divButtons').hide();
};

Template.matches.helpers({
	games() {
        return Games.find();
	},
	game() {
		return rGame.get();
	},
    maxplayers() {
        return rMaxPlayers.get();
    },
    // Implementação do index manual a alocação de jogadores (descobrir como fazer automatico com blaze)
    arrMaxPlayers() {
        var arrMaxPlayers = [];
        for (var i = 1; i <= rMaxPlayers.get(); i++) {
            arrMaxPlayers.push({index: i});
        }
        return arrMaxPlayers;
    },
    friends() {
        return Friends.find({meu_id: Meteor.user()._id});
    },
    timer() {
        return clock.elapsedTime({format: '00:00:00'});
    }
});

Template.matches.events({
    // Search games
    'change #selectGame' : function(event, template) {
      	game = Games.findOne({bggid: $("#selectGame").val()[0]});
		rGame.set(game);
        rMaxPlayers.set(game.maxplayers);
        rMinPlayers.set(game.minplayers);
        $('#divButtons').show();
    },
    'click #btnMatchNow' : function(event, template) {
        $('#divButtons').hide();
        $('#divPlayers').show();
    },
    'change .selectPlayer' : function(event, template) {
        var imgPlayer = "<img width='30' src='https://www.guidesmiths.com/uploads/images/1450466520567_avatar-default_1.png'>";
        if ($("#player"+this.index).val() == "Selecione um jogador") {
            $("#imgPlayer"+this.index).html("");
        } else {
            $("#imgPlayer"+this.index).html(imgPlayer);
        } 
    },
    'click #btnStartMatch' : function(event, template) {
        if (minPlayersFilled()) {
            $('#panelSearch').hide();
            $('#divPlayers').hide();
            $('#subtitleGame').html("Partida em andamento");
            $('#pBtnCountPoints').html('<button type="button" id="btnCountPoints" class="btn btn-default">Contar os pontos e finalizar a partida</button>');
            clock.start();
        } else {
            alert("Para este jogo deve ter no mínimo " + rMinPlayers.get() + ' players selecionados');
        }
    }
});

// Valid if min players is selected for match
function minPlayersFilled() {
    var contPlayers = 0;
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        if (! ($("#player"+i).val() == "Selecione um jogador") ) {
            contPlayers++;
        }
    }
    if (contPlayers < rMinPlayers.get()) {
        return false;
    } else {
        return true;
    }
}