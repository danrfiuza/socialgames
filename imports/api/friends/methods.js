import {Meteor} from 'meteor/meteor';
import {Friends} from './friend.js';
import './friend.js';

Meteor.methods({
    'friends.add'(dados) {
        // var usuario = Meteor.users.findOne({_id: dados.amigos});
        var usuario = Meteor.users.findOne({_id: Meteor.user()._id});

        if (isFriendExist(dados)) {
            return "friend-exist";
        } else {
            if (usuario.services.facebook) {
                buildFriendFacebook(dados, usuario);
            } else {
                buildFriendBase(dados, usuario);
            }
            user = Meteor.user();
            Meteor.users.update(Meteor.userId(), {$addToSet: {'profile.friends': friend}});
            return "ok";
        }

    }
});

/*******************************************************************
 ** GATO TEMPORARIO ATÉ DESCOBRIR PQ O API/FRIENDS/FRIENDS.JS NÃO
 ** ESTA SENDO IMPORTADO
 ********************************************************************/
//export const  Friends = new Mongo.Collection('users');

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
