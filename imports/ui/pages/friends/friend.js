import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import './friend.html';

Meteor.subscribe('friends.listEmails');
Meteor.subscribe('friends.list');

Friends = new Mongo.Collection('friends');

Template.friends.rendered = function () {
    $("#amigos").select2({
        placeholder: TAPi18n.__('friend.ENTER_FRIENDS_ADDRESS'),
        maximumSelectionLength: 1,
        allowClear: true
    });
};

Template.friends.helpers({
    allUsers() {
        var usuarioLogado_id = Meteor.user()._id;
        return Meteor.users.find({_id: {$ne: usuarioLogado_id}});
    },
    emailDoAmigo() {
        if (this.services.facebook) {
            return this.services.facebook.email;
        } else {
            return this.emails[0].address;
        }
    },
    friends() {
        if (Meteor.users.findOne({_id: Meteor.user()._id}).profile.friends) {
            amigosDoUsuario = Meteor.users.findOne({_id: Meteor.user()._id}).profile.friends;

            //Prepara o array de amigos do usuario corrente
            console.log(amigosDoUsuario);
            var listaFriends = [];
            amigosDoUsuario.forEach(function (amigo) {
                var dadosAmigo = {};
                dadosAmigo = Meteor.users.findOne({_id: amigo.user_id});
                if (dadosAmigo) {
                    dadosAmigo.jogosExperimentados = Meteor.call('matchs.findCountDistinct', dadosAmigo);
                    if (!dadosAmigo.jogosExperimentados) {
                        dadosAmigo.jogosExperimentados = 0;
                    }
                    // Meteor.call('matchs.findCount', dadosAmigo, function (e, result) {
                    //     Session.set('totalPartidas',result);
                    // });

                    // dadosAmigo.totalAmigos = _.size(dadosAmigo.profile.friends);
                    // dadosAmigo.jogosExperimentados = Session.get('jogosExperimentados');
                    // dadosAmigo.totalPartidas = Session.get('totalPartidas') ;

                    // console.log(dadosAmigo);
                    // dadosAmigo.jogosExperimentados = Meteor.apply('matchs.findCountDistinct', dadosAmigo,{wait: true}, function(err,data){
                    // return data;
                    // if (err)
                    //     console.log(err);
                    // chartData = JSON.parse(data);
                    // console.log(data);
                    // createChart(chartData);
                    // });
                    console.log(dadosAmigo);
                    // console.log(dadosAmigo.jogosExperimentados );

                    // dadosAmigo.totalPartidas = Session.get('totalPartidas') ;

                    listaFriends.push(dadosAmigo);
                }
            });
            return listaFriends;
        }
    }
});

Template.friends.events({
    // Adiciona um amigo em sua lista de amigos
    'click #btnAddFriend': function () {
        let friends = $('form[name="form-add-friend"]').serializeJSON();
        Meteor.call('friends.add', friends, function (e, result) {
            if (!e) {
                if (result == "friend-exist") {
                    Bert.alert(TAPi18n.__('friend.ALREADY_YOUR_FRIEND'), 'warning');
                } else {
                    Bert.alert(TAPi18n.__('friend.FRIEND_ADDED_SUCCESSFULLY'), 'success');
                }
            } else {
                Bert.alert(e, 'warning');
            }
        });
    },
    'click #btnAcceptRequest': function (event) {
        event.preventDefault();
        Meteor.call('friends.acceptRequest', event.target.attributes[0].nodeValue, function (e, result) {
            if (!e) {
                Bert.alert(TAPi18n.__('friend.FRIEND_ADDED_SUCCESSFULLY'), 'success');
            } else {
                Bert.alert(e, 'warning');
            }
        });
    }
});
