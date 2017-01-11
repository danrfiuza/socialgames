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

        //Só deve ter no json os valores para serem inseridos no BD, qualquer coisa diferente e deletada, uma questão de segurança
        var valoresParaInserir = ["_id", "autocomplete", "name", "formatted_address", "country_short", "lat", "lng"];
        $.each(place, function(indice, item) {
            if (!valoresParaInserir.indexOf(indice)) {
                delete place[indice];
            }
        });

        //Validação basica de campos obrigatorios
        var valoresObrigatorios = ["autocomplete", "name", "formatted_address", "country_short", "lat", "lng"];
        var booObrigatoriosPreenchidos = true;
        $.each(place, function(indice, item) {
            if (valoresObrigatorios.indexOf(indice)) {
                if (item == '') {
                    booObrigatoriosPreenchidos = false
                }
            }
        });

        if (booObrigatoriosPreenchidos == true) {
            Meteor.call('places.insert', place, function (e, result) {
                if(result){
                    Bert.alert( TAPi18n.__('places.LOCATION_SAVED'), 'success');
                } else {
                    Bert.alert( TAPi18n.__('places.ERROR_SAVE_LOCATION'), 'danger');
                }
            });
        } else {
            Bert.alert( TAPi18n.__('places.THERE_IS_REQUIRED_FIELD'), 'danger');
        }

        $('#place').val('');//Clear input
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
