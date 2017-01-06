import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

export const Friends = new Mongo.Collection('user');

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
    var qtdAmigo = Friends.find({amigo_id: dados.amigos, meu_id: Meteor.user()._id}).count();
    if (qtdAmigo > 0) {
        return true;
    } else {
        return false;
    }
}
