import { Meteor } from 'meteor/meteor';

Meteor.subscribe('game.list');

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

	// load boardgame
	loadGame: function (game, rGame, rMaxPlayers, rMinPlayers, rPlayers) {
        rGame.set(game);
        rMaxPlayers.set(game.maxplayers);
        rMinPlayers.set(game.minplayers);
        rPlayers.set([]);
	},

	// Load select combo with friends
	loadComboFriends: function (rComboFriends) {
	    friends = Meteor.users.findOne({_id: Meteor.user()._id}).profile.friends;
	    comboFriends = [];
	    var cont = 1;
	    var userLogged = Meteor.user();
	    var emailUserLogged = Service.captureEmail(userLogged);
	    var name = userLogged.profile.name;
	    var content = name + ' <' + emailUserLogged + '>';
	    comboFriends[0] = { id : Meteor.user()._id, text : content}

	    _.forEach(friends, function(item){
	    	var userPlayer = Meteor.users.findOne({_id: item.user_id});
	        emailAmigo = Service.captureEmail(userPlayer);
	        name = userPlayer.profile.name;
	        content = name + ' <' + emailAmigo + '>';
	        comboFriends[cont] = { id : item.user_id, text :  content };
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
	addPlayerMatch: function (userId, rPlayers, name) {
	    var players = rPlayers.get();
	    players.push({ user_id: userId, first: false, firstName: name });
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
	isValidScore: function (rPlayers) {
	    var isValid = true;
	    for (var i = 1; i <= rPlayers.get().length; i++) {
	        if ( $("#ptPlayer"+i).val().length > 0 ) {
	            if (! $.isNumeric($("#ptPlayer"+i).val()) ) {
	                isValid = false;
	            }
	        } else {
	        	isValid = false;
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

	buildGenericMatch: function (game) {
	    var match = {};
	    match.game = game._id;
	    if ($('#place').val().length > 0) {
	        match.place = $('#place').val()[0];
	    }
	    return match;
	},

	// Assemble match information
	buildMatch: function (rPodium, game, time) {
	    var match = Service.buildGenericMatch(game);
	    match.players = rPodium.get();
	    match.timer = time;
	    match.winner = rPodium.get()[0].user_id;
	    match.created_at = new Date().getTime();
	    return match;
	},

	// Assemble match schedule information
	buildMatchSchedule: function (rPlayers, game) {
	    var match = Service.buildGenericMatch(game);
	    match.players = rPlayers.get();
	    match.date_schedule = $('#dateMatch').val();
	    match.created_at = new Date().getTime();
	    return match;
	},

	// Persists a match
	saveMatch: function (match, rMatchId) {
	    Meteor.call('matchs.insert', match, function (e, result) {
	        if(result) {
	            rMatchId.set(result);
	        } else {
	            rMatchId.set('error');
	        }
	    });
	},

	// Screeshot of trophy with match results
	printScreen: function (html) {
	    var css = '';
	    Meteor.call('webshot.snap', {html:html, css:css}, function (e, result) {});
	},

	// Ger first name of text
	firstName: function (text) {
		return text.split(" ", 1)[0];
	}
}