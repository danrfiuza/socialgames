import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './game.html';

var rGames = new ReactiveVar([]);

Template.games.rendered = function(){
    $("#divBtnNewGame").hide();
};

Template.games.helpers({
    games() {
        return rGames.get();
    }
});

Template.games.events({
	'click #btnSearchGame' : function(event, template){

		if ($("#search").val() == "") {
			Bert.alert('Escreva algum valor no campo de busca');
		} else {
			var criteria = {'name': {$regex:'.*' + $("#search").val() + '.*', $options: "$i"}}
	        Meteor.call('game.find', criteria, function (e, result) {
	            rGames.set(result);
	            if (result.length == 0) {
	            	Bert.alert('Nenhum resultado encontrado');
	            }
	        });
	        $("#divBtnNewGame").show();
		}
    }
});