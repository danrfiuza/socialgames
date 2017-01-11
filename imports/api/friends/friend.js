import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Friends = new Mongo.Collection('user');

// Monta um registro de amigo vindo do facebook
function buildFriendFacebook(dados, usuario) {
    return friend = {
        friend_id: dados.amigos,
        createdAt: new Date().getTime()
    }
}

// Monta um registro de amigo da base
function buildFriendBase(dados, usuario) {
    return friend = {
        friend_id: dados.amigos,
        createdAt: new Date().getTime()
    }
}

// Verifica se o amigo já existe na collection de amigos
function isFriendExist(dados) {
    var qtdAmigo = Meteor.users.find({"profile.friends.friend_id": dados.amigos, _id: Meteor.user()._id}).count();
    if (qtdAmigo > 0) {
        return true;
    } else {
        return false;
    }
}
