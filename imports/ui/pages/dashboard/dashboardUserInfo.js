import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.dashboardUserInfo.helpers({
	user() {
    	var usuarioId = Meteor.userId();
		return Meteor.users.findOne({_id: usuarioId});
	},
	friends() {
		return Friends.find({meu_id: Meteor.user()._id});
	},
	userInfo() {
		var userInfo;
        totalPartidas = 10;
        jogoDiferentesQueJogou = 15;
        return array[userInfo , jogoDiferentesQueJogou];
	}
});