import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'

Meteor.subscribe('game.list');

var rGame = new ReactiveVar(0);
var rMaxPlayers = new ReactiveVar(0);
var rMinPlayers = new ReactiveVar(0);
var rPlayers = new ReactiveVar([]);
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
    hideInitialElements();
    rPlayers.set([]);
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
    },
    players() {
        return rPlayers.get();
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
        rPlayers.set([]);
    },
    'click #btnMatchNow' : function(event, template) {
        $('#divButtons').hide();
        $('#divPlayers').show();
        $('#divBtnStarMatch').show();
    },
    'change .selectPlayer' : function(event, template) {
        var selectedIndex = event.target.selectedIndex;
        var imgPlayer = "<img width='30' src='https://www.guidesmiths.com/uploads/images/1450466520567_avatar-default_1.png'>";
        if ($("#player"+this.index).val() == "Selecione um jogador") {
            $("#imgPlayer"+this.index).html("");
            removePlayerMatch(selectedIndex);
        } else {
            var emailPlayer = $(event.target.options[selectedIndex]).attr("data-mail");
            $("#imgPlayer"+this.index).html(imgPlayer);
            addPlayerMatch(emailPlayer);
        }
    },
    'click #btnStartMatch' : function(event, template) {
        if (minPlayersFilled()) {
            prepareToStart();
            clock.start();
        } else {
            alert("Para este jogo deve ter no mínimo " + rMinPlayers.get() + ' players selecionados');
        }
    },
    'click #btnFirstPlayer' : function(event, template) {
        randomizeFirstPlayer();
        $('#divBtnFirstPlayer').hide();
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

function hideInitialElements() {
    $('#viewGame').hide();
    $('#divPlayers').hide();
    $('#divButtons').hide();
    $('#divBtnStarMatch').hide();
    $('#divBtnFirstPlayer').hide();
}

function removePlayerMatch(index) {
    var players = rPlayers.get();
    players.splice(index, 1);
    rPlayers.set(players);
}

function addPlayerMatch(emailPlayer) {
    var players = rPlayers.get();
    players.push({ mail : emailPlayer, first : false });
    rPlayers.set(players);
}

function prepareToStart() {
    $('#divBtnStarMatch').hide();
    $('#divBtnFirstPlayer').show();
    $('#panelSearch').hide();
    $('#divPlayers').hide();
    $('#subtitleGame').html("Partida em andamento");
    $('#pBtnCountPoints').html('<button type="button" id="btnCountPoints" class="btn btn-default">Contar os pontos e finalizar a partida</button>');
}

function randomizeFirstPlayer() {
    var players = rPlayers.get();
    var numFirst = Math.floor((Math.random() * players.length) + 1);
    players[numFirst - 1].first = true;
    rPlayers.set(players);
}