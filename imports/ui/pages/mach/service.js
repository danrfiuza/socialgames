import { Meteor } from 'meteor/meteor';

export var Service = {
	// Mount select2 in combo players elements 
	prepareAutoComplateForPlayers: function (rMaxPlayers) {
	    for (var i = 1; i <= rMaxPlayers.get(); i++) {
	        $("#player"+i).select2({
	            placeholder: "digite o email do seu amigo",
	            maximumSelectionLength: 1
	        });
	    }
	},

	// caputure email from user
	captureEmail: function (user) {
	    if (user.services.facebook) {
	        email = user.services.facebook.email;
	    } else {
	        email = user.emails[0].address;
	    }
	    return email;
	},

	// Load select combo with friends
	loadComboFriends: function (rComboFriends) {
	    friends = Meteor.users.findOne({_id: Meteor.user()._id}).profile.friends;
	    comboFriends = [];
	    var cont = 1;
	    var emailUserLogged = Service.captureEmail(Meteor.user());
	    comboFriends[0] = { id : Meteor.user()._id, text : emailUserLogged}

	    _.forEach(friends, function(item){
	        emailAmigo = Service.captureEmail(Meteor.users.findOne({_id: item.friend_id}));
	        comboFriends[cont] = { id : item.friend_id, text : emailAmigo };
	        cont++;
	    });

	    rComboFriends.set(comboFriends);
	},

	// set status in option select friends ex. disabled
	setStatusItemComboFriends: function (index, status, rComboFriends) {
	    var arrFriends = rComboFriends.get();
	    arrFriends[index].status = status;
	    rComboFriends.set(arrFriends);
	},

	// Valid if min players is selected for match
	minPlayersFilled: function (rPlayers, rMinPlayers) {
	    if (rPlayers.get().length < rMinPlayers.get()) {
	        return false;
	    } else {
	        return true;
	    }
	},

	// Remove a player of match
	removePlayerMatch: function (index, rPlayers) {
	    var players = rPlayers.get();
	    players.splice(index, 1);
	    rPlayers.set(players);
	},

	// Include a player of match
	addPlayerMatch: function (emailPlayer, rPlayers) {
	    var players = rPlayers.get();
	    players.push({ mail : emailPlayer, first : false });
	    rPlayers.set(players);
	},

	// Randomize the first player
	randomizeFirstPlayer: function (rPlayers) {
	    var players = rPlayers.get();
	    var numFirst = Math.floor((Math.random() * players.length) + 1);
	    players[numFirst - 1].first = true;
	    rPlayers.set(players);
	},

	// Disable select list of players not used
	disableComboPlayers: function (rMaxPlayers) {
	    for (var i = 1; i <= rMaxPlayers.get(); i++) {
	        $("#player"+i).prop('disabled', 'disabled');
	    }
	},

	// Validates players' scores
	isValidScore: function (rMaxPlayers) {
	    var isValid = true;
	    for (var i = 1; i <= rMaxPlayers.get(); i++) {
	        if ( $("#player"+i).val().length != 0 ) {
	            if (! $.isNumeric($("#ptPlayer"+i).val()) ) {
	                isValid = false;
	            }
	        }
	    }
	    return isValid;
	},

	// Sort the players according to the score of the match
	orderRanking: function (rPlayers, rMaxPlayers, rPodium) {
	    var players = rPlayers.get();
	    for (var i = 1; i <= rMaxPlayers.get(); i++) {
	        if ( $("#player"+i).length != 0 ) {
	            if (players[i - 1] != undefined) {
	                players[i-1].pontos = $("#ptPlayer"+i).val();
	            }
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
	},

	buildGenericMatch: function (rGame) {
	    var match = {};
	    match.game = rGame.get()._id;
	    if ($('#place').val().length > 0) {
	        match.place = $('#place').val()[0];
	    }
	    return match;
	},

	// Assemble match information
	buildMatch: function (rPodium, rGame, time) {
	    var match = this.buildGenericMatch(rGame);
	    match.players = rPodium.get();
	    match.timer = time;
	    match.created_at = new Date().getTime();
	    return match;
	},

	// Assemble match schedule information
	buildMatchSchedule: function (rPlayers) {
	    var match = this.buildGenericMatch();
	    match.players = rPlayers.get();
	    match.date_schedule = $('#dateMatch').val();
	    match.created_at = new Date().getTime();
	    return match;
	},

	// Persists a match
	saveMatch: function (match) {
	    Meteor.call('matchs.insert', match, function (e, result) {
	        if(result) {
	            console.log("Partida foi salva no banco de dados");
	            return result;
	        } else {
	            console.log("Erro ao tentar salvar uma partida");
	            return 'error';
	        }
	    });
	},

	// Screeshot of trophy with match results
	printScreen: function (html) {
	    var css = '';
	    Meteor.call('webshot.snap', {html:html, css:css}, function (e, result) {});
	}
}