import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Matchs = new Mongo.Collection('matchs');

Meteor.methods({
	'matchs.insert'(match){
		Matchs.insert(match);
		return true;
	},
	'matchs.find'(){
		return Matchs.find().fetch();
	}
});