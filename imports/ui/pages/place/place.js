import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'
import './place.html';
import './placeForm.html';
import './placeList.html';
import '../../components/map/map.js';

var lista = new ReactiveVar(0);

Template.places.events({

    'click #save' : function(event, template){

        let place = $('form[name="new-place"]').serializeJSON();

        Meteor.call('places.insert', place, function (e, result) {
            if(result){
                alert("Local salvo com sucesso");
            } else {
                alert("Erro ao tentar salvar um local");
            }
        });

        Meteor.call('places.find', null, function (e, result) {
            lista.set(result);
        });
    }
});

Template.places.helpers({
  lista() {
    Meteor.call('places.find', null, function (e, result) {
        lista.set(result);
    });
    return lista.get();
  }
});