import { ReactiveVar } from 'meteor/reactive-var'

var autocomplete = new ReactiveVar(0);

Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
  var MAP_ZOOM = 15;

  // Template.map.onCreated(function() {
    // GoogleMaps.ready('map', function(map) {
    //   google.maps.event.addListener(map.instance, 'click', function(event) {
    //     Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    //   });

    //   var markers = {};

    //   Markers.find().observe({
    //     added: function (document) {
    //       var marker = new google.maps.Marker({
    //         draggable: true,
    //         animation: google.maps.Animation.DROP,
    //         position: new google.maps.LatLng(document.lat, document.lng),
    //         map: map.instance,
    //         id: document._id
    //       });

    //       google.maps.event.addListener(marker, 'dragend', function(event) {
    //         Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
    //       });

    //       markers[document._id] = marker;
    //     },
    //     changed: function (newDocument, oldDocument) {
    //       markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
    //     },
    //     removed: function (oldDocument) {
    //       markers[oldDocument._id].setMap(null);
    //       google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
    //       delete markers[oldDocument._id];
    //     }
    //   });
    // });
  // });

  Meteor.startup(function() {
    GoogleMaps.load();
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

    // GoogleMaps.init({
    //   'sensor': false, //optional
    //   'key': 'AIzaSyCnhZDqVEhZvzJirmcaTfI1yKBHMfbGjC4', //optional
    //   'language': 'en',  //optional
    //   'libraries': 'places'
    // });


    GoogleMaps.ready('map', function(map) {
      var marker;

      // Create and move the marker when latLng changes.
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        // If the marker doesn't yet exist, create it.
        if (! marker) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance,
            sensor: false,
            key: 'AIzaSyCnhZDqVEhZvzJirmcaTfI1yKBHMfbGjC4',
            language: 'en',
            libraries: 'places'
          });
        }
        // The marker already exists, so we'll just change its position.
        else {
          marker.setPosition(latLng);
        }

        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
// console.log('Template.map.autocompleteasdfasdf');
// console.log(Template);
//         var autocomplete = new google.maps.places.autocomplete(
//           ('autocomplete'),{types: ['geocode'] }
//       );
      });
    });

    // GoogleMaps.onCreated('map', function(map) {
    //   var autocomplete = new google.maps.places.autocomplete(
    //     (document.getElementById('autocomplete')),{types: ['geocode'] }
    //   );
    // });
  });
}
