import Component from '@ember/component';
import district from '../models/district';

export default Component.extend({
    isRelation: false,
    property: {},
    markersArray: Array(),
    deleteOverlays() {
        var self = this;
        if (this.get('markersArray')) {
            self.get('markersArray').forEach(function(marker) {
                marker.setMap(null);
            });
            self.set('markersArray', Array());
        }
    },
    placeMarker(location) {
        var self = this;
        // first remove all markers if there are any
        self.deleteOverlays();

        var marker = new google.maps.Marker({
            position: location,
            map: self.get('map')
        });

        // add marker in markers array
        // markersArray.push(marker);
        self.get('markersArray').push(marker);

        //map.setCenter(location);
    },
    geocodeLatLng(map, latlong) {
        var self = this;
        self.set('property.long ', latlong.lng());  
        self.set('property.lat', latlong.lat());
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        geocoder.geocode({
            'location': latlong
        }, function(results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    // map.setZoom(12);
                    var marker = new google.maps.Marker({
                        position: latlong,
                        map: map
                    });
                    map.setCenter(latlong)
                    map.setZoom(15)
                    self.deleteOverlays();
                    self.get('markersArray').push(marker);
                    infowindow.setContent(results[1].formatted_address);
                    infowindow.open(map, marker);
                    console.log(results)
                    self.set('property.address', results[1].formatted_address);
                }
            }
        });
    },
    initMap() {
        var self = this;
        this.set('property.lat', 23.128363);
        this.set('property.long', 42.199707);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: new google.maps.LatLng(self.get('property.lat'), self.get('property.long')),
        });

        // self.placeMarker(new google.maps.LatLng({
        //     lat: parseFloat(self.get('meetingRoomLatitude')),
        //     lng: parseFloat(self.get('meetingRoomLongitude'))
        // }));
        // var markersArray = [];
        /***************search box****************/
        var searchBox = new google.maps.places.SearchBox(document.getElementById('input-pac-input'));
        google.maps.event.addListener(searchBox, 'places_changed', function() {
            self.deleteOverlays();
            var places = searchBox.getPlaces();
            // if(places[0].formatted_address){
            //     self.set('property.address', places[0].formatted_address)
            // }
            var bounds = new google.maps.LatLngBounds();
            var i, place;
            for (i = 0; place = places[i]; i++) {
                bounds.extend(place.geometry.location);
                // place a marker
                self.placeMarker(place.geometry.location);
                // display the lat/lng 
                self.set('property.lat', place.geometry.location.lat());
                self.set('property.long', place.geometry.location.lng());
            }
            self.get('map').fitBounds(bounds);
            self.get('map').setZoom(15);

        });
        /***************map click*********/
        google.maps.event.addListener(map, "click", function(event) {
            // place a marker
             var latlng = event.latLng
            console.log(latlng)

            self.placeMarker(latlng);
                        
            self.geocodeLatLng(map, latlng);

            // display the lat/lng 
           
          
            console.log(self.get('propertyLong'))
           
        });

        self.set('map', map);


    },
    didInsertElement() {
       this.set('types', this.store.findAll('type'));
       this.set('regions', this.store.findAll('region'));
       if(this.get('currentProperty')){
        this.set('isRelation', true);
        setTimeout(() => {
            this.initMap();
        }, 10);
        this.set('property', this.get('currentProperty'))
       }

       
    },
    actions:{
        changeRelation(value){
            this.set('selectedRelation', value);
            this.set('isRelation', true);
            setTimeout(() => {
                this.initMap();
            }, 10);
           
        },
        regionChange(value){
            this.set('property.region', value);
            this.set('districts', value.get('districts'))
            this.set('property.district', null);
            this.get('map').setCenter( new google.maps.LatLng(value.get('location').lat, value.get('location').long));
            this.get('map').setZoom(12);
        },
        districtChange(value){
            this.set('property.district', value);
            this.get('map').setCenter( new google.maps.LatLng(value.get('location').lat, value.get('location').long));
            this.get('map').setZoom(15);
        },
        basicSubmitAction(){
    
            // console.log(JSON.stringify(this.get('property')))
            let self = this;
            let property =  this.get('property');
            property.district = this.get('property.district.id');
            property.region = this.get('property.region.id');
            property.type = this.get('property.type.id');
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl("mproperty"), 'POST', resolve, reject, property);
            }).then(
                success => {
                    console.log(success)
                },
                errors => {
                    console.log(errors)
                }
            )
        }

    }
});
