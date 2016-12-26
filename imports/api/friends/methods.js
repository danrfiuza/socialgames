import { Meteor } from 'meteor/meteor';
import { Friends } from './friend.js';

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