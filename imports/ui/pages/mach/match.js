import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './match.html';

Meteor.subscribe('game.list');
Games = new Mongo.Collection('games');

var rGame = new ReactiveVar(0);
var rMaxPlayers = new ReactiveVar(0);
var rMinPlayers = new ReactiveVar(0);
var rPlayers = new ReactiveVar([]);
var rPodium = new ReactiveVar([]);
var clock = new ReactiveClock("clock");
var rComboFriends = new ReactiveVar([]);
clock.setElapsedSeconds(0);
clock.stop();


Template.matches.rendered = function(){
    $("#selectGame").select2({
    	placeholder: "Começe a digite o nome do jogo",
    	maximumSelectionLength: 1,
      	allowClear: true
    });
    if(Meteor.Device.isDesktop()){
        $('.input-group.date').datepicker();
    }
    hideInitialElements();
    rPlayers.set([]);
    rGame.set([]);
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
    },
    friends() {
        return rComboFriends.get();
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
        $('#panelSearch').hide();
        loadComboFriends();
        prepareAutoComplateForPlayers();
    },
    'click #btnScheduleMatch' : function(event, template) {
        $('#divButtons').hide();
        $('#divPlayers').show();
        $('#divBtnSaveSchedule').show();
        $('#divSchedle').show();
        $('#panelSearch').hide();
        loadComboFriends();
        prepareAutoComplateForPlayers();
    },
    'change .selectPlayer' : function(event, template) {
        var selectedIndex = event.target.selectedIndex;
        // if not unselect
        if (selectedIndex != -1) {
            var imgPlayer = '<em class="fa fa-user fa-2x">';
            var emailPlayer = event.target.options[selectedIndex].innerHTML;
            $("#imgPlayer"+this.index).html(imgPlayer);
            addPlayerMatch(emailPlayer);
            setStatusItemComboFriends(selectedIndex, 'disabled');
            prepareAutoComplateForPlayers();
        }
    },
    'select2:unselect .selectPlayer' : function(event, template) {
        var selectedIndex = event.target.selectedIndex;
        $("#imgPlayer"+this.index).html("");
        removePlayerMatch(selectedIndex);
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
        if (isValidScore()) {
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

// Mount select2 in combo players elements 
function prepareAutoComplateForPlayers() {
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        $("#player"+i).select2({
            placeholder: "digite o email do seu amigo",
            maximumSelectionLength: 1
        });
    }
}

// Load select combo with friends
function loadComboFriends() {
    frieds = Friends.find({meu_id: Meteor.user()._id}).fetch();
    comboFriends = [];
    var cont = 1;
    var emailUserLogged = '';
    if (Meteor.user().services.facebook) {
        emailUserLogged = Meteor.user().services.facebook.email;
    } else {
        emailUserLogged = Meteor.user().emails[0].address;
    }
    comboFriends[0] = { id : Meteor.user()._id, text : emailUserLogged}
    _.forEach(frieds, function(item){
        comboFriends[cont] = { id : item._id, text : item.email };
        cont++;
    });
    rComboFriends.set(comboFriends);
}

// set status in option select friends ex. disabled
function setStatusItemComboFriends(index, status) {
    var arrFriends = rComboFriends.get();
    arrFriends[index].status = status;
    rComboFriends.set(arrFriends);
}

// Valid if min players is selected for match
function minPlayersFilled() {
    var contPlayers = 0;
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        if ( $("#player"+i).val().length != 0 ) {
            contPlayers++;
        }
    }
    if (contPlayers < rMinPlayers.get()) {
        return false;
    } else {
        return true;
    }
}

// Hides the initial elements that will not be used yet
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
    $('#divBtnSaveSchedule').hide();
    $('#divSchedle').hide();
}

// Remove a player of match
function removePlayerMatch(index) {
    var players = rPlayers.get();
    players.splice(index, 1);
    rPlayers.set(players);
}

// Include a player of match
function addPlayerMatch(emailPlayer) {
    var players = rPlayers.get();
    players.push({ mail : emailPlayer, first : false });
    rPlayers.set(players);
}

// Displays the screen elements for the starting status
function prepareToStart() {
    $('#divBtnStarMatch').hide();
    $('#divBtnFirstPlayer').show();
    $('#panelSearch').hide();
    $('#divPlayers').hide();
    $('#readyPlayers').show();
    $('#subtitleGame').html("Partida em andamento");
    $('#pBtnCountPoints').html('<button type="button" id="btnFinishCount" class="btn btn-default">Contar os pontos e finalizar a partida</button>');
}

// Randomize the first player
function randomizeFirstPlayer() {
    var players = rPlayers.get();
    var numFirst = Math.floor((Math.random() * players.length) + 1);
    players[numFirst - 1].first = true;
    rPlayers.set(players);
}

// Disable select list of players not used
function disableComboPlayers() {
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        $("#player"+i).prop('disabled', 'disabled');
    }
}

// Validates players' scores
function isValidScore() {
    var isValid = true;
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        if ( $("#player"+i).val().length != 0 ) {
            if (! $.isNumeric($("#ptPlayer"+i).val()) ) {
                isValid = false;
            }
        }
    }
    return isValid;
}

// Sort the players according to the score of the match
function orderRanking() {
    var players = rPlayers.get();
    for (var i = 1; i <= rMaxPlayers.get(); i++) {
        if ( $("#player"+i).val().length != 0 ) {
            players[i -1].pontos = $("#ptPlayer"+i).val();
        }
    }
    players.sort(function(a, b){
        if (parseInt(a.pontos) > parseInt(b.pontos)) {
            return -1;
        } else if (parseInt(a.pontos) < parseInt(b.pontos)) {
            return 1;
        } else {
            return 0; 
        }
    });
    rPlayers.set(players);
    rPodium.set(players);
}

// Assemble match information
function mountMatch() {
    var match = {};
    match.players = rPlayers.get();
    match.game = rGame.get();
    match.timer = clock.elapsedTime();
    match.podium = rPodium.get();
    return match;
}

// Persists a match
function salveMatch(match) {
    Meteor.call('matchs.insert', match, function (e, result) {
        if(result){
            console.log("Partida foi salva no banco de dados");
        } else {
            console.log("Erro ao tentar salvar uma partida");
        }
    });
}