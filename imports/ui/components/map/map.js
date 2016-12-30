import { ReactiveVar } from 'meteor/reactive-var'
import './map.html';


if (Meteor.isClient) {
  var MAP_ZOOM = 15;

  Meteor.startup(function() {
    GoogleMaps.load({
      key: 'AIzaSyCnhZDqVEhZvzJirmcaTfI1yKBHMfbGjC4',
      libraries: 'places'
    });
  });

  Template.map.helpers({
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
  });

  Template.map.onCreated(function() {
    var self = this;

    GoogleMaps.ready('map', function(map) {
      var marker;

      // Cria e move o marcador quando a latitude muda
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;
      });
    });
  });

  Template.map.onRendered(function() {
    this.autorun(function () {
      if (GoogleMaps.loaded()) {
        $("#autocomplete").geocomplete({
          map: ".map-container",
          mapOptions: {
            zoom: MAP_ZOOM
          },
          markerOptions: {
            draggable: false
          },
          details: "form"
        });

        // var autocomplete = new google.maps.places.autocomplete((document.getElementById('autocomplete')),{types: ['geocode'] });
      }
    });
  });

  Template.map.events({
    'click button': function() {
      // Trigger geocoding request.
      $("#autocomplete").trigger("geocode");
    }
  })

}
