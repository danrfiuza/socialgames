import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Friends = new Mongo.Collection('user');

// Monta um registro de amigo da base
function buildFriendBase(dados, idRequester) {
    return {
        user_id: dados.amigos,
        createdAt: new Date().getTime(),
        requester_is: idRequester,
        requestAccepted: false
    }
}

// Verifica se o amigo já existe na collection de amigos
function isFriendExist(dados) {
    // var qtdAmigo = Meteor.users.find({"profile.friends.friend_id": dados.amigos, _id: Meteor.user()._id}).count();
    var qtdAmigo = Meteor.users.find({"profile.friends.user_id": dados.amigos, _id: Meteor.user()._id}).count();

    return (qtdAmigo > 0);
}