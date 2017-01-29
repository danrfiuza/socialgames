import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { State } from './state.js';
import { Service } from './service.js';

import './newmatch.html';

Meteor.subscribe('game.list');
Games = new Mongo.Collection('games');

var rGame = new ReactiveVar(0);
var rMaxPlayers = new ReactiveVar(0);
var rMinPlayers = new ReactiveVar(0);
var rPlayers = new ReactiveVar([]);
var rPodium = new ReactiveVar([]);
var clock = new ReactiveClock("clock");
var rComboFriends = new ReactiveVar([]);
var rPlaces = new ReactiveVar(0);
var rMatchId = new ReactiveVar(0);
clock.setElapsedSeconds(0);
clock.stop();

Template.newmatch.rendered = function(){

    $("#selectGame").select2({
        placeholder: TAPi18n.__('match.HINT_CHOOSE_GAME'),
        maximumSelectionLength: 1,
        allowClear: true
    });
    $("#place").select2({
        placeholder: "Local",
        maximumSelectionLength: 1,
        allowClear: true
    });
    State.change('begin');
    rPlayers.set([]);
    rGame.set([]);

    if (typeof document.game != 'undefined') {
        State.change('game');
        game = Games.findOne({bggid: document.game});
        Service.loadGame(game, rGame, rMaxPlayers, rMinPlayers, rPlayers);
    }
};

Template.newmatch.helpers({
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
    },
    places() {
        Meteor.call('places.find', null, function (e, result) {
            rPlaces.set(result);
        });
        return rPlaces.get();
    },
    match_id() {
        return rMatchId.get();
    }
});

Template.newmatch.events({
    'click #btnBack' : function(event, template) {
        location.href = "/newmatch";
    },
    // Search games
    'change #selectGame' : function(event, template) {
        State.change('game');
        game = Games.findOne({bggid: $("#selectGame").val()[0]});
        Service.loadGame(game, rGame, rMaxPlayers, rMinPlayers, rPlayers);
    },
    'click #btnMatchNow' : function(event, template) {
        State.change('match-now');
        Service.loadComboFriends(rComboFriends);
        Service.prepareAutoComplateForPlayers(rMaxPlayers);
    },
    'click #btnScheduleMatch' : function(event, template) {
        State.change('match-schedule');
        Service.loadComboFriends(rComboFriends);
        Service.prepareAutoComplateForPlayers(rMaxPlayers);
    },
    'change .selectPlayer' : function(event, template) {
        var selectedIndex = event.target.selectedIndex;
        // if not unselect
        if (selectedIndex != -1) {
            var imgPlayer = '<em class="fa fa-user fa-2x">';
            var textPlayer = event.target.options[selectedIndex].innerHTML;
            var userId = event.target.options[selectedIndex].value;
            $("#imgPlayer"+this.index).html(imgPlayer);
            var firstName = Service.firstName(textPlayer);
            Service.addPlayerMatch(userId, rPlayers, firstName);
            Service.setStatusItemComboFriends(selectedIndex, 'disabled', rComboFriends);
            Service.prepareAutoComplateForPlayers(rMaxPlayers);
        }
    },
    'select2:unselect .selectPlayer' : function(event, template) {
        var selectedIndex = event.target.selectedIndex;
        $("#imgPlayer"+this.index).html("");
        Service.removePlayerMatch(selectedIndex, rPlayers);
    },
    'click #btnStartMatch' : function(event, template) {
        if (Service.minPlayersFilled(rPlayers, rMinPlayers)) {
            State.change('start');
            clock.start();
        } else {
            Bert.alert('Para este jogo deve ter no mínimo ' + rMinPlayers.get() + ' players selecionados', 'danger');
        }
    },
    'click #btnFirstPlayer' : function(event, template) {
        Service.randomizeFirstPlayer(rPlayers);
        $('#btnFirstPlayer').hide();
    },
    'click #btnFinishCount' : function(event, template) {
        clock.stop();
        Service.disableComboPlayers(rMaxPlayers);
        State.change('score');
    },
    'click #btnFinishMatch' : function(event, template) {
        if (Service.isValidScore(rPlayers)) {
            Service.orderRanking(rPlayers, rMaxPlayers, rPodium);
            State.change('trophy');
            Service.saveMatch(Service.buildMatch(rPodium, rGame.get(), clock.elapsedTime()), rMatchId);
        } else {
            Bert.alert('Algo está errado com a pontuação informada', 'danger');
        }
    },
    'click #btnSaveSchedule' : function(event, template) {
        Service.saveMatch(Service.buildMatchSchedule(rPlayers, rGame.get()), rMatchId);
        State.change('schedule');
    },
    'click #btnPublishFacebook': function(event, template) {
        Service.printScreen($('#imgShareMatch').html());
    },
    'click #btnNewMatch': function(event, template) {
        location.href = '/matches';
    }
});