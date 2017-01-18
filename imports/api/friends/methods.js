import {Meteor} from 'meteor/meteor';
import {Friends} from './friend.js';
import './friend.js';

// export const Friends = new Mongo.Collection('users');

Meteor.methods({
    'friends.add'(dados) {
        // var usuario = Meteor.users.findOne({_id: Meteor.user()._id});

        if (isFriendExist(dados)) {
            return "friend-exist";
        } else {
            friend = buildFriendBase(dados, Meteor.userId());
            Meteor.users.update(Meteor.userId(), {$addToSet: {'profile.friends': friend}});

            requester = buildFriendBase({'amigos': Meteor.userId()}, Meteor.userId());
            Meteor.users.update(dados.amigos, {$addToSet: {'profile.friends': requester}});

            return true;
        }
    },
    'friends.getUserFriends'(user) {
        var listaFriends = [];
        if (user.profile.friends) {
            amigosDoUsuario = user.profile.friends;

            //Prepara o array de amigos do usuario corrente
            amigosDoUsuario.forEach(function (amigo) {
                listaFriends.push(Meteor.users.findOne({_id: amigo.user_id}));
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
    var qtdAmigo = Meteor.users.find({"profile.friends.user_id": dados.amigos, _id: Meteor.user()._id}).count();
    return (qtdAmigo > 0);
}
