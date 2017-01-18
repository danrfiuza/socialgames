import {Meteor} from 'meteor/meteor';
import {Friends} from './friend.js';
import './friend.js';

// export const Friends = new Mongo.Collection('users');

Meteor.methods({
    'friends.add'(dados) {
        // var usuario = Meteor.users.findOne({_id: dados.amigos});
        var usuario = Meteor.users.findOne({_id: Meteor.user()._id});

        if (isFriendExist(dados)) {
            return "friend-exist";
        } else {
            buildFriendBase(dados, usuario);
            Meteor.users.update(Meteor.userId(), {$addToSet: {'profile.friends': friend}});
            return true;
        }
    },
    'friends.getUserFriends'(user) {
        var listaFriends = [];
        if (user.profile.friends) {
            amigosDoUsuario = user.profile.friends;

            //Prepara o array de amigos do usuario corrente
            amigosDoUsuario.forEach(function (amigo) {
                listaFriends.push(Meteor.users.findOne({_id: amigo.friend_id}));
            });
        }
        return listaFriends;

    }
});

/*******************************************************************
 ** GATO TEMPORARIO ATÉ DESCOBRIR PQ O API/FRIENDS/FRIENDS.JS NÃO
 ** ESTA SENDO IMPORTADO
 ********************************************************************/
//export const  Friends = new Mongo.Collection('users');

// Monta um registro de amigo da base
function buildFriendBase(dados, usuario) {
    return friend = {
        user_id: dados.amigos,
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
