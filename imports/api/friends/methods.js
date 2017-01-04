import { Meteor } from 'meteor/meteor';
import { Friends } from './friend.js';
import './friend.js';

Meteor.methods({
    'friends.add'(dados) {
        var usuario = Meteor.users.findOne({_id: dados.amigos});
        if (isFriendExist(dados)) {
            return "friend-exist";
        } else {
            if (usuario.services.facebook) {
                buildFriendFacebook(dados, usuario);
            } else {
                buildFriendBase(dados, usuario);
            }
            Friends.insert(friend);
            return "ok";
        }

    }
});

/*******************************************************************
** GATO TEMPORARIO ATÉ DESCOBRIR PQ O API/FRIENDS/FRIENDS.JS NÃO
** ESTA SENDO IMPORTADO
********************************************************************/
//export const  Friends = new Mongo.Collection('friends');

// Monta um registro de amigo vindo do facebook
function buildFriendFacebook(dados, usuario) {
    return friend = {
        nome: usuario.profile.name,
        email: usuario.services.facebook.email,
        amigo_id: dados.amigos,
        meu_id: Meteor.user()._id
    }
}

// Monta um registro de amigo da base
function buildFriendBase(dados, usuario) {
    return friend = {
        email: usuario.emails[0].address,
        amigo_id: dados.amigos,
        meu_id: Meteor.user()._id
    }
}

// Verifica se o amigo já existe na collection de amigos
function isFriendExist(dados) {
    var qtdAmigo = Friends.find({amigo_id:dados.amigos, meu_id: Meteor.user()._id}).count();
    if (qtdAmigo > 0 ) {
        return true;
    } else {
        return false;
    }
}