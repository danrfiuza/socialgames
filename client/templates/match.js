import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'

Meteor.subscribe('game.list');

var rGame = new ReactiveVar(0);
var rMaxPlayers = new ReactiveVar(0);
var rMinPlayers = new ReactiveVar(0);
var rPlayers = new ReactiveVar([]);
var rPodium = new ReactiveVar([]);
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
    },
    podium() {
        return rPodium.get();
    },
    loggedUser() {
        return Meteor.user();
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
        var imgPlayer = '<em class="fa fa-user fa-2x">';
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
    },
    'click #btnFinishCount' : function(event, template) {
        $('#divPlayers').show();
        $('#readyPlayers').hide();
        clock.stop();
        $('#pTimer').css('color', '#999');
        $('#subtitleGame').html("Contagem de pontos");
        $('#pBtnCountPoints').hide();
        disableComboPlayers();
        $('#divBtnFinishMatch').show();
    },
    'click #btnFinishMatch' : function(event, template) {
        if (isValidPoits()) {
            orderRanking();
            $('#classification').show();
            $('#divPlayers').hide();
            $('#divBtnFinishMatch').hide();
            $('#divBtnPublish').show();
            salveMatch(mountMatch());
        } else {
            alert("Algo está errado com a pontuação informada");
        }
    }
});

// Valid if min players is selected for match
function minPlayersFilled() {
    var contPlayers = 0;
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        if ( ($("#player"+i).val() != "Selecione um jogador") ) {
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
    $('#divBtnFinishMatch').hide();
    $('#classification').hide();
    $('#divBtnPublish').hide();
    $('#readyPlayers').hide();
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
    $('#readyPlayers').show();
    $('#subtitleGame').html("Partida em andamento");
    $('#pBtnCountPoints').html('<button type="button" id="btnFinishCount" class="btn btn-default">Contar os pontos e finalizar a partida</button>');
}

function randomizeFirstPlayer() {
    var players = rPlayers.get();
    var numFirst = Math.floor((Math.random() * players.length) + 1);
    players[numFirst - 1].first = true;
    rPlayers.set(players);
}

function disableComboPlayers() {
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        $("#player"+i).prop('disabled', 'disabled');
    }
}

function isValidPoits() {
    var isValid = true;
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        if ( ($("#player"+i).val() != "Selecione um jogador") ) {
            if (! $.isNumeric($("#ptPlayer"+i).val()) ) {
                isValid = false;
            }
        }
    }
    return isValid;
}

function orderRanking() {
    var players = rPlayers.get();
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        if ( ($("#player"+i).val() != "Selecione um jogador") ) {
            players[i -1].pontos = $("#ptPlayer"+i).val();
        }
    }
    players.sort(function(a, b){
        if (a.pontos > b.pontos) {
            return -1;
        } else if (a.pontos < b.pontos) {
            return 1;
        } else {
            return 0; 
        }
    });
    rPlayers.set(players);
    rPodium.set(players);
}

function mountMatch() {
    var match = {};
    match.players = rPlayers.get();
    match.game = rGame.get();
    match.timer = clock.elapsedTime();
    match.podium = rPodium.get();
    return match;
}

function salveMatch(match) {
    Meteor.call('matchs.insert', match, function (e, result) {
        if(result){
            console.log("Partida foi salva no banco de dados");
        } else {
            console.log("Erro ao tentar salvar uma partida");
        }
    });
}